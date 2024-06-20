import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InserirQuartosComponent } from './inserir-quartos/inserir-quartos.component';
import { ListarQuartosComponent } from './listar-quartos/listar-quartos.component';
import { EditarQuartosComponent } from './editar-quartos/editar-quartos.component';
import { ExcluirQuartosComponent } from './excluir-quartos/excluir-quartos.component';

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
  {
    path: 'editar/:id',
    component: EditarQuartosComponent,
  },
  {
    path: 'excluir/id',
    component: ExcluirQuartosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuartosRoutingModule {}
