import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from '../models/guest-View.Model';
import { HospedesService } from '../services/hospedes.service';
import { ActivatedRoute } from '@angular/router';
'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-editar-hospedes',
  templateUrl: './editar-hospedes.component.html',
  styleUrls: ['./editar-hospedes.component.scss']
})
export class EditarHospedesComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private hospedesService: HospedesService,
    private router: Router, private notification: NotificationService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hospedesService.selecionarPorId(id)
    .subscribe({
      next: hospede => this.form.reset(hospede),
      error: (error) => this.processarFalha(error)
    });
  }

  campoEstaInvalido(name: string) {
    return this.form?.get(name)!.touched && this.form?.get(name)!.invalid;
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

  gravar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hospedesService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: GuestViewModel | undefined): void {
    this.router.navigate(['/hospedes', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private getControl(controlId: string): AbstractControl<string> {
    return this.form.controls[controlId];
  }
}
