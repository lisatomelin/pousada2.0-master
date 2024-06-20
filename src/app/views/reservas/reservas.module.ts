import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';
import { InserirReservasComponent } from './inserir-reservas/inserir-reservas.component';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { ReservasService } from './services/reservas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatOptionModule } from '@angular/material/core';
import { EditarReservasComponent } from './editar-reservas/editar-reservas.component';
import { ExcluirReservasComponent } from './excluir-reservas/excluir-reservas.component';

@NgModule({
  declarations: [
    InserirReservasComponent,
    ListarReservasComponent,
    EditarReservasComponent,
    ExcluirReservasComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReservasRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
  ],

  providers: [ReservasService],
})
export class ReservasModule {}
