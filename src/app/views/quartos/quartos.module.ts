import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuartosRoutingModule } from './quartos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirQuartosComponent } from './inserir-quartos/inserir-quartos.component';
import { ListarQuartosComponent } from './listar-quartos/listar-quartos.component';
import { HttpClientModule } from '@angular/common/http';
import { QuartosService } from './services/quartos.service';

@NgModule({
  declarations: [InserirQuartosComponent, ListarQuartosComponent],
  imports: [
    CommonModule,
    QuartosRoutingModule,
    HttpClientModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],

  providers: [QuartosService]
})
export class QuartosModule {}
