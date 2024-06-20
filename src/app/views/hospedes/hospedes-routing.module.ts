import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { InserirHospedesComponent } from './inserir-hospedes/inserir-hospedes.component';
import { ListarHospedesComponent } from './listar-hospedes/listar-hospedes.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospedesRoutingModule {}
