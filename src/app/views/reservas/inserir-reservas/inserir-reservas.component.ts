import { ReservasService } from './../services/reservas.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { Observable, map } from 'rxjs';
import { GuestViewModel } from '../../hospedes/models/guest-View.Model';
import { RoomsViewModel } from '../../quartos/models/rooms-View.Model';

@Component({
  selector: 'app-inserir-reservas',
  templateUrl: './inserir-reservas.component.html',
  styleUrls: ['./inserir-reservas.component.scss']
})
export class InserirReservasComponent implements OnInit {
  form!: FormGroup;
  hospedes$?: Observable<GuestViewModel[]>;
  quartos$?:  Observable<RoomsViewModel[]>;

  constructor(private fb: FormBuilder, private reservasService: ReservasService,
    private route: ActivatedRoute, private router: Router, private notification: NotificationService) {}


  ngOnInit(): void {
    this.form = this.fb.group({
      CheckIn: new FormControl('', [Validators.required]),
      CheckOut: new FormControl('', [Validators.required]),
      NumberOfAdults: new FormControl('', [Validators.required]),
      NumberOfChildren: new FormControl('', [Validators.required]),
      GuestId: new FormControl('', [Validators.required]),
      RoomId: new FormControl('', [Validators.required]),

    });

    this.hospedes$ = this.route.data.pipe(map(dados => dados['guests']))
    this.quartos$ = this.route.data.pipe(map(dados => dados['rooms']))
  }



  gravar(): void {
    this.reservasService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: ReservationViewModel) {
    this.router.navigate(['/reservation', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

}
