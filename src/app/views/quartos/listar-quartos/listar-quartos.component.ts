import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListarQuartosViewModel } from '../models/listar-quartos.View.Model';
import { QuartosService } from '../services/quartos.service';

@Component({
  selector: 'app-listar-quartos',
  templateUrl: './listar-quartos.component.html',
  styleUrls: ['./listar-quartos.component.scss'],
})
export class ListarQuartosComponent implements OnInit {
  quartos$?: Observable<ListarQuartosViewModel[]>;

  constructor(private quartosService: QuartosService) {}

  ngOnInit(): void {
    this.quartos$ = this.quartosService.selecionarTodos();
  }
}
