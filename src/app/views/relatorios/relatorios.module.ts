import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListarRelatorioReservasComponent } from './relatorio-reservas/listar-relatorio-reservas/listar-relatorio-reservas.component';
;


@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    ListarRelatorioReservasComponent
  ]
})
export class RelatoriosModule { }
