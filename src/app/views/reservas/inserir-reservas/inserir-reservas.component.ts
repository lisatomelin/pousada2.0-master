import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from '../../hospedes/models/guest-View.Model';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { RoomsViewModel } from '../../quartos/models/rooms-View.Model';
import { QuartosService } from '../../quartos/services/quartos.service';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { ReservasService } from './../services/reservas.service';

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
  selector: 'app-inserir-reservas',
  templateUrl: './inserir-reservas.component.html',
  styleUrls: ['./inserir-reservas.component.scss']
})
export class InserirReservasComponent implements OnInit {
  form!: FormGroup<Form>;
  hospedes: GuestViewModel[] = [];
  quartos: RoomsViewModel[] = [];

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService,
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

    forkJoin([
      this.hospedeService.selecionarTodos(),
      this.quartoService.selecionarTodos()
    ])
    .subscribe({
      next: ([hospedes, quartos]) => {
        this.hospedes = hospedes;
        this.quartos = quartos;
      },
      error: error => this.processarFalha(error)
    })

  }

  checkInHasError() {
    return this.getControl('checkIn').touched 
    && this.getControl('checkIn').invalid
  }

  getcheckInError() {
    if (!this.checkInHasError()) return "";
    return "Obrigatório"
  }

  checkOutHasError() {
    return this.getControl('checkOut').touched 
    && this.getControl('checkOut').invalid
  }

  getcheckOutError() {
    if (!this.checkOutHasError()) return "";
    return "Obrigatório"
  }

  numberOfAdultsHasError() {
    return this.getControl('numberOfAdults').touched 
    && this.getControl('numberOfAdults').invalid
  }

  getnumberOfAdultsError() {
    if (!this.numberOfAdultsHasError()) return "";
    return "Obrigatório"
  }

  numberOfChildrenHasError() {
    return this.getControl('numberOfChildren').touched 
    && this.getControl('numberOfChildren').invalid
  }

  getnumberOfChildrenError() {
    if (!this.numberOfChildrenHasError()) return "";
    return "Obrigatório"
  }

  guestIdHasError() {
    return this.getControl('guestId').touched 
    && this.getControl('guestId').invalid
  }

  getguestIdError() {
    if (!this.guestIdHasError()) return "";
    return "Obrigatório"
  }

  roomIdHasError() {
    return this.getControl('roomId').touched 
    && this.getControl('roomId').invalid
  }

  getroomIdError() {
    if (!this.roomIdHasError()) return "";
    return "Obrigatório"
  }

  gravar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.validForm()) {
      return;
    }
    this.reservasService.criar(this.form?.value as ReservationViewModel).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err)
    });
  }

  processarSucesso(res: ReservationViewModel) {
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

  private getControl(controlId: string): AbstractControl<any> {
    return (this.form.controls as any)[controlId];
  }
}
