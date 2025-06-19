import { Routes, RouterModule } from '@angular/router';
import { ListarRelatorioReservasComponent } from './relatorio-reservas/listar-relatorio-reservas/listar-relatorio-reservas.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarRelatorioReservasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
