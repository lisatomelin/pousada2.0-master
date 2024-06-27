import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from '../../hospedes/models/guest-View.Model';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { RoomsViewModel } from '../../quartos/models/rooms-View.Model';
import { QuartosService } from '../../quartos/services/quartos.service';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { ReservasService } from '../services/reservas.service';

declare type FormValue<T> = T | null;

interface Form {
  checkIn: FormControl<FormValue<Date>>;
  checkOut: FormControl<FormValue<Date>>;
  numberOfAdults: FormControl<FormValue<number>>;
  numberOfChildren: FormControl<FormValue<number>>;
  guestId: FormControl<FormValue<string>>;
  roomId: FormControl<FormValue<string>>;
}

@Component({
  selector: 'app-editar-reservas',
  templateUrl: './editar-reservas.component.html',
  styleUrls: ['./editar-reservas.component.scss'],
})
export class EditarReservasComponent {
  form!: FormGroup<Form>;
  hospedes: GuestViewModel[] = [];
  quartos: RoomsViewModel[] = [];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private hospedeService: HospedesService,
    private quartoService: QuartosService,
  ) { }


  ngOnInit(): void {
    this.form = this.fb.group<Form>({
      checkIn: new FormControl(null, [Validators.required]),
      checkOut: new FormControl(null, [Validators.required]),
      numberOfAdults: new FormControl(null, [Validators.required]),
      numberOfChildren: new FormControl(null, [Validators.required]),
      guestId: new FormControl(null, [Validators.required]),
      roomId: new FormControl(null, [Validators.required])
    });
    const id = this.route.snapshot.paramMap.get('id')!;
    forkJoin([
      this.hospedeService.selecionarTodos(),
      this.quartoService.selecionarTodos(),
      this.reservasService.selecionarPorId(id)
    ])
      .subscribe({
        next: ([hospedes, quartos, reservation]) => {
          this.hospedes = hospedes;
          this.quartos = quartos;
          this.form.reset(reservation);
        },
        error: error => this.processarFalha(error)
      });

  }

  gravar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.validForm()) {
      return;
    }
    const id = this.route.snapshot.paramMap.get('id')!;
    this.reservasService.editar(id, this.form?.value as ReservationViewModel).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    });
  }

  processarSucesso(res: ReservationViewModel | undefined) {
    this.router.navigate(['/reservas', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private validForm(): boolean {
    const formValue = this.form.getRawValue();
    const quarto = this.quartos.find(item => item.id === formValue.roomId);
    if (!quarto) {
      this.notification.aviso('Quarto não encontrado!');
      return false;
    }
    const capacity: number = (formValue.numberOfAdults || 0) + (formValue.numberOfChildren || 0);
    if (quarto.capacity < capacity) {
      this.notification.aviso('A capacidade máxima do quarto foi ultrapassada!');
      return false;
    }
    return true;
  }

}
