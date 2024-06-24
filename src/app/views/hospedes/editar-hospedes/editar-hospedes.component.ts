import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(name: string) {
    return this.form?.get(name)!.touched && this.form?.get(name)!.invalid;
  }

  gravar(): void {
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

}
