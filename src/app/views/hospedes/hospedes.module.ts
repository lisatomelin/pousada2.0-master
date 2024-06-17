import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InserirHospedesComponent } from './inserir-hospedes/inserir-hospedes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HospedesRoutingModule } from './hospedes-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListarHospedesComponent } from './listar-hospedes/listar-hospedes.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HospedesService } from './services/hospedes.service';

@NgModule({
  declarations: [InserirHospedesComponent, ListarHospedesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    HospedesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],

  providers: [HospedesService],
})
export class HospedesModule {}
