import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuartosService } from '../services/quartos.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FormsQuartosViewModel } from '../models/forms-quartos.View.Model';

@Component({
  selector: 'app-inserir-quartos',
  templateUrl: './inserir-quartos.component.html',
  styleUrls: ['./inserir-quartos.component.scss']
})
export class InserirQuartosComponent implements OnInit{
  form!: FormGroup;


  constructor(private fb: FormBuilder, private quartosService: QuartosService,
    private router: Router, private notification: NotificationService){}


  ngOnInit(): void {
    this.form = this.fb.group({
      number: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      decription: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
    });
  }

  campoEstaInvalido(number: string) {
    return this.form?.get(number)!.touched && this.form?.get(number)!.invalid;
  }

  gravar(): void {
    this.quartosService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: FormsQuartosViewModel) {
    this.router.navigate(['/quartos', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

}
