import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { ListarFinanceiroComponent } from './listar-financeiro/listar-financeiro.component';
import { EditarFinanceiroComponent } from './editar-financeiro/editar-financeiro.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarFinanceiroComponent,
  },
  {
    path: 'editar/:id',
    component: EditarFinanceiroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceiroRoutingModule {}
