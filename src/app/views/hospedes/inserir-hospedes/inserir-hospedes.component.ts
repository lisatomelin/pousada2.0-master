import { HospedesService } from './../services/hospedes.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from '../models/guest-View.Model';

@Component({
  selector: 'app-inserir-hospedes',
  templateUrl: './inserir-hospedes.component.html',
  styleUrls: [],
})
export class InserirHospedesComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private hospedesService: HospedesService,
    private router: Router, private notification: NotificationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      phone_Number: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(nome: string) {
    return this.form?.get(nome)!.touched && this.form?.get(nome)!.invalid;
  }

  gravar(): void {
    this.hospedesService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: GuestViewModel) {
    this.router.navigate(['/guests', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}

