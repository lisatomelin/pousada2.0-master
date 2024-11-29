import { HospedesService } from './../services/hospedes.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
  styleUrls: ['./inserir-hospedes.component.scss'],
})
export class InserirHospedesComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private hospedesService: HospedesService,
    private router: Router, private notification: NotificationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  nameHasError() {
    return this.getControl('name').touched 
    && this.getControl('name').invalid
  }

  getNameError() {
    if (!this.nameHasError()) return "";
    return "Obrigatório"
  }

  cpfHasError() {
    return this.getControl('cpf').touched 
    && this.getControl('cpf').invalid
  }

  getCpfError() {
    if (!this.cpfHasError()) return "";
    return "Obrigatório"
  }

  emailHasError() {
    return this.getControl('email').touched 
    && this.getControl('email').invalid
  }

  getEmailError() {
    if (!this.emailHasError()) return "";
    return "Obrigatório"
  }

  phoneNumberHasError() {
    return this.getControl('phoneNumber').touched 
    && this.getControl('phoneNumber').invalid
  }

  getPhoneNumberError() {
    if (!this.phoneNumberHasError()) return "";
    return "Obrigatório"
  }

  campoEstaInvalido(name: string) {
    return this.form?.get(name)!.touched && this.form?.get(name)!.invalid;
  }

  gravar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.hospedesService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: GuestViewModel) {
    this.router.navigate(['/hospedes', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private getControl(controlId: string): AbstractControl<string> {
    return this.form.controls[controlId];
  }
}

