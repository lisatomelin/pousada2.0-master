import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListarRelatorioReservasComponent } from './relatorio-reservas/listar-relatorio-reservas/listar-relatorio-reservas.component';
import { HttpClientModule } from '@angular/common/http';
import { RelatoriosRoutingModule } from './relatorios-routing.module';

import { ReservasRoutingModule } from '../reservas/reservas-routing.module';
import { RelatoriosService } from './services/relatorios.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { NotificationModule } from 'src/app/core/notification/notification.module';
;


@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    RelatoriosRoutingModule,
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
  declarations: [
    ListarRelatorioReservasComponent
  ],

  providers: [RelatoriosService],
})
export class RelatoriosModule { }
