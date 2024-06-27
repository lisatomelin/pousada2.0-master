import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NotificationModule } from 'src/app/core/notification/notification.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditarReservasComponent } from './editar-reservas/editar-reservas.component';
import { ExcluirReservasComponent } from './excluir-reservas/excluir-reservas.component';
import { InserirReservasComponent } from './inserir-reservas/inserir-reservas.component';
import { ListarReservasComponent } from './listar-reservas/listar-reservas.component';
import { ReservasRoutingModule } from './reservas-routing.module';
import { ReservasService } from './services/reservas.service';

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
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    NotificationModule,
    MatDatepickerModule

  ],

  providers: [ReservasService],
})
export class ReservasModule {}
