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
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { EditarHospedesComponent } from './editar-hospedes/editar-hospedes.component';
import { ExcluirHospedesComponent } from './excluir-hospedes/excluir-hospedes.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [InserirHospedesComponent, ListarHospedesComponent, EditarHospedesComponent, ExcluirHospedesComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    HospedesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
  ],

  providers: [HospedesService],
})
export class HospedesModule {}
