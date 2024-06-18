import { HospedesService } from './../services/hospedes.service';
import { Component, OnInit } from '@angular/core';
import { ListarHospedesViewModel } from '../models/listar-hospedes.View.Model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-hospedes',
  templateUrl: './listar-hospedes.component.html',
  styleUrls: [],
})
export class ListarHospedesComponent implements OnInit {
  hospedes$?: Observable<ListarHospedesViewModel[]>;

  constructor(private hospedesService: HospedesService) {}

  ngOnInit(): void {
    this.hospedes$ = this.hospedesService.selecionarTodos();
  }
}
