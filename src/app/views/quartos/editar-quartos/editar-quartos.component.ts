import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuartosService } from '../services/quartos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { RoomsViewModel } from '../models/rooms-View.Model';

@Component({
  selector: 'app-editar-quartos',
  templateUrl: './editar-quartos.component.html',
  styleUrls: ['./editar-quartos.component.scss'],
})
export class EditarQuartosComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private quartosService: QuartosService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      number: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
    });
    const id = this.route.snapshot.paramMap.get('id')!;
    this.quartosService.selecionarPorId(id)
    .subscribe({
      next: quarto => this.form.reset(quarto),
      error: (error) => this.processarFalha(error)
    });
  }

  campoEstaInvalido(number: string) {
    return this.form?.get(number)!.touched && this.form?.get(number)!.invalid;
  }

  gravar(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.quartosService.editar(id, this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }
  processarSucesso(res: RoomsViewModel | undefined) {
    this.router.navigate(['/quartos', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}
