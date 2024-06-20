import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirQuartosComponent } from './inserir-quartos/inserir-quartos.component';
import { ListarQuartosComponent } from './listar-quartos/listar-quartos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarQuartosComponent,
  },
  {
    path: 'inserir',
    component: InserirQuartosComponent,
   
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
