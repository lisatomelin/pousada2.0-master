import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FinanceiroRoutingModule } from './financeiro-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListarFinanceiroComponent } from './listar-financeiro/listar-financeiro.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FinanceiroService } from './services/financeiro.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { EditarFinanceiroComponent } from './editar-financeiro/editar-financeiro.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NotificationModule } from 'src/app/core/notification/notification.module';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    ListarFinanceiroComponent, 
    EditarFinanceiroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FinanceiroRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    NotificationModule,
    MatDatepickerModule
  ],

  providers: [FinanceiroService],
})
export class FinanceiroModule {}
