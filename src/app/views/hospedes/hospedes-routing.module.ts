import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { InserirHospedesComponent } from './inserir-hospedes/inserir-hospedes.component';
import { ListarHospedesComponent } from './listar-hospedes/listar-hospedes.component';
import { EditarHospedesComponent } from './editar-hospedes/editar-hospedes.component';
import { ExcluirHospedesComponent } from './excluir-hospedes/excluir-hospedes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarHospedesComponent,
  },

  {
    path: 'inserir',
    component: InserirHospedesComponent,
  },
  {
    path: 'editar/:id',
    component: EditarHospedesComponent,
  },
  {
    path: 'excluir/:id',
    component: ExcluirHospedesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospedesRoutingModule {}
