import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirReservasComponent } from './inserir-reservas/inserir-reservas.component';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { EditarReservasComponent } from './editar-reservas/editar-reservas.component';
import { ExcluirReservasComponent } from './excluir-reservas/excluir-reservas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarReservasComponent,
  },

  {
    path: 'inserir',
    component: InserirReservasComponent,

  },
  {
    path: 'editar/:id',
    component: EditarReservasComponent,
  },
  {
    path: 'excluir/id',
    component: ExcluirReservasComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
