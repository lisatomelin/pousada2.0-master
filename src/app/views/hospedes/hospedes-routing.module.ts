import { Routes, RouterModule, ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { NgModule, inject } from '@angular/core';
import { InserirHospedesComponent } from './inserir-hospedes/inserir-hospedes.component';
import { ListarHospedesComponent } from './listar-hospedes/listar-hospedes.component';
import { HospedesService } from './services/hospedes.service';
import { VisualizarHospedesViewModel } from './models/visualizar-hospedes.View.Model';

const listarHospedesResolver = () => {
  return inject(HospedesService).selecionarTodos();
};

const formsHospedesResolver = (route: ActivatedRouteSnapshot) => {
  const id = route.paramMap.get('id')!;

  return inject(HospedesService).selecionarPorId(id);
};

const visualizarHospedesResolver: ResolveFn<VisualizarHospedesViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(HospedesService).selecionarPorId(
    route.paramMap.get('id')!
  );
};

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
    resolve: { hospede: listarHospedesResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HospedesRoutingModule {}
