import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  hospedes$?: Observable<GuestViewModel[]>;
  quartos$?: Observable<RoomsViewModel[]>;

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

    this.hospedes$ = this.hospedeService.selecionarTodos();
    this.quartos$ = this.quartoService.selecionarTodos();
  }

  gravar(): void {
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

}
