import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirQuartosComponent } from './inserir-quartos/inserir-quartos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'inserir',
    component: InserirQuartosComponent,
    //resolve: { hospede: listarQuartosResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
