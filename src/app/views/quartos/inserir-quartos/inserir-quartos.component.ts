import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuartosService } from '../services/quartos.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { RoomsViewModel } from '../models/rooms-View.Model';


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
      description: new FormControl('', [Validators.required]),
      capacity: new FormControl('', [Validators.required]),
    });
  }

  numberHasError() {
    return this.getControl('number').touched 
    && this.getControl('number').invalid
  }

  getNumberError() {
    if (!this.numberHasError()) return "";
    return "Obrigatório"
  }

  floorHasError() {
    return this.getControl('floor').touched 
    && this.getControl('floor').invalid
  }

  getFloorError() {
    if (!this.floorHasError()) return "";
    return "Obrigatório"
  }

  descriptionHasError() {
    return this.getControl('description').touched 
    && this.getControl('description').invalid
  }

  getDescriptionError() {
    if (!this.descriptionHasError()) return "";
    return "Obrigatório"
  }

  capacityHasError() {
    return this.getControl('capacity').touched 
    && this.getControl('capacity').invalid
  }

  getCapacityError() {
    if (!this.capacityHasError()) return "";
    return "Obrigatório"
  }

  campoEstaInvalido(number: string) {
    return this.form?.get(number)!.touched && this.form?.get(number)!.invalid;
  }

  gravar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }
    this.quartosService.criar(this.form?.value).subscribe({
      next: (res) => this.processarSucesso(res),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(res: RoomsViewModel) {
    this.router.navigate(['/quartos', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private getControl(controlId: string): AbstractControl<string> {
    return this.form.controls[controlId];
  }
}
