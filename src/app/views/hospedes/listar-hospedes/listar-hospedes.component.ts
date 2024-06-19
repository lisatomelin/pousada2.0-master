import { HospedesService } from './../services/hospedes.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { GuestViewModel } from '../models/guest-View.Model';

@Component({
  selector: 'app-listar-hospedes',
  templateUrl: './listar-hospedes.component.html',
  styleUrls: ['./listar-hospedes.component.scss'],
})
export class ListarHospedesComponent implements OnInit {
  hospedes$?: Observable<GuestViewModel[]>;

  constructor(private hospedesService: HospedesService) {}

  ngOnInit(): void {
    this.hospedes$ = this.hospedesService.selecionarTodos();
  }
}
