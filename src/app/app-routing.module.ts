import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'financeiro',
    loadChildren: () =>
      import('./views/financeiro/financeiro.module').then(
        (m) => m.FinanceiroModule
      ),
  },
  {
    path: 'hospedes',
    loadChildren: () =>
      import('./views/hospedes/hospedes.module').then(
        (m) => m.HospedesModule
      ),
  },
  {
    path: 'quartos',
    loadChildren: () =>
      import('./views/quartos/quartos.module').then(
        (m) => m.QuartosModule
      ),
  },
  {
    path: 'reservas',
    loadChildren: () =>
      import('./views/reservas/reservas.module').then(
        (m) => m.ReservasModule
      ),
  },
  {
    path: 'relatorios',
    loadChildren: () =>
      import('./views/relatorios/relatorios.module').then(
        (m) => m.RelatoriosModule
      ),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
