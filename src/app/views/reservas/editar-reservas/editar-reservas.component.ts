import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from '../../hospedes/models/guest-View.Model';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { RoomsViewModel } from '../../quartos/models/rooms-View.Model';
import { QuartosService } from '../../quartos/services/quartos.service';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { ReservasService } from '../services/reservas.service';

@Component({
  selector: 'app-editar-reservas',
  templateUrl: './editar-reservas.component.html',
  styleUrls: ['./editar-reservas.component.scss'],
})
export class EditarReservasComponent {
  form!: FormGroup;
  hospedes$?: Observable<GuestViewModel[]>;
  quartos$?: Observable<RoomsViewModel[]>;

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
    this.form = this.fb.group({
      checkIn: new FormControl('', [Validators.required]),
      checkOut: new FormControl('', [Validators.required]),
      numberOfAdults: new FormControl('', [Validators.required]),
      numberOfChildren: new FormControl('', [Validators.required]),
      guestId: new FormControl('', [Validators.required]),
      roomId: new FormControl('', [Validators.required]),
    });
    const id = this.route.snapshot.paramMap.get('id')!;
    this.reservasService.selecionarPorId(id)
      .subscribe({
        next: reservation => this.form.reset(reservation),
        error: (error) => this.processarFalha(error)
      });
    this.hospedes$ = this.hospedeService.selecionarTodos();
    this.quartos$ = this.quartoService.selecionarTodos();
  }

  gravar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.reservasService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: ReservationViewModel | undefined) {
    this.router.navigate(['/reservas', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}
