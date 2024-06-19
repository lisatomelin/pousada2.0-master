import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { QuartosService } from '../services/quartos.service';
import { RoomsViewModel } from '../models/rooms-View.Model';

@Component({
  selector: 'app-listar-quartos',
  templateUrl: './listar-quartos.component.html',
  styleUrls: ['./listar-quartos.component.scss'],
})
export class ListarQuartosComponent implements OnInit {
  quartos$?: Observable<RoomsViewModel[]>;

  constructor(private quartosService: QuartosService) {}

  ngOnInit(): void {
    this.quartos$ = this.quartosService.selecionarTodos();
  }
}
