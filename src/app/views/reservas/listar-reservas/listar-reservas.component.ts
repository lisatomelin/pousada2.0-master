import { Component, OnInit } from '@angular/core';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { ReservasService } from '../services/reservas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.scss']
})
export class ListarReservasComponent implements OnInit {
  reservas$?: Observable<ReservationViewModel[]>;


  constructor(private reservasService: ReservasService) {}
  ngOnInit(): void {

    this.reservas$ = this.reservasService.selecionarTodos();
  }

}
