import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { FinanceiroService } from '../services/financeiro.service';
import { ActivatedRoute } from '@angular/router';
import { FinancialViewModel } from '../models/financial-View.Model';
'src/app/core/notification/services/notification.service';

interface Form {
  id: FormControl<string | null>;
  checkIn: FormControl<string | null>;
  checkOut: FormControl<string | null>;
  guestId: FormControl<string | null>;
  guestName: FormControl<string | null>;
  roomId: FormControl<string | null>;
  roomName: FormControl<string | null>;
  reservationValue: FormControl<number | null>;
  additionalValue: FormControl<number | null>;
  totalValue: FormControl<number | null>;
  paymentMethod: FormControl<string | null>;
}

@Component({
  selector: 'app-editar-financeiro',
  templateUrl: './editar-financeiro.component.html',
  styleUrls: ['./editar-financeiro.component.scss']
})
export class EditarFinanceiroComponent implements OnInit {
  form!: FormGroup<Form>;

  constructor(
    private fb: FormBuilder,
    private financeiroService: FinanceiroService,
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl<string | null>(null),
      checkIn: new FormControl<string | null>({value: null, disabled: true}),
      checkOut: new FormControl<string | null>({value: null, disabled: true}),
      guestId: new FormControl<string | null>({value: null, disabled: true}),
      guestName: new FormControl<string | null>({value: null, disabled: true}),
      roomId: new FormControl<string | null>({value: null, disabled: true}),
      roomName: new FormControl<string | null>({value: null, disabled: true}),
      reservationValue: new FormControl<number | null>(null),
      additionalValue: new FormControl<number | null>(null),
      totalValue: new FormControl<number | null>({value: 0, disabled: true}),
      paymentMethod: new FormControl<string | null>(null, [Validators.required])
    });
    this.form.valueChanges.subscribe(form => {
      let totalValue = 0;
      totalValue += Number(form.reservationValue) || 0;
      totalValue += Number(form.additionalValue) || 0;
      this.form.controls.totalValue.reset(totalValue, { emitEvent: false });
    })
    const id = this.route.snapshot.paramMap.get('id')!;
    this.financeiroService.selecionarPorId(id)
      .subscribe({
        next: hospede => {
          this.form.reset({
            id: hospede?.id,
            checkIn: hospede?.checkIn.toString(),
            checkOut: hospede?.checkOut.toString(),
            guestId: hospede?.guestId,
            guestName: hospede?.guestName,
            roomId: hospede?.roomId,
            roomName: hospede?.roomName,
            reservationValue: hospede?.reservationValue,
            additionalValue: hospede?.additionalValue,
            paymentMethod: hospede?.payment
          })
        },
        error: (error) => this.processarFalha(error)
      });
  }

  campoEstaInvalido(name: string) {
    return this.form?.get(name)!.touched && this.form?.get(name)!.invalid;
  }

  phoneNumberHasError() {
    return this.campoEstaInvalido('phoneNumber');
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
    this.financeiroService.editar(this.readForm()).subscribe({
      next: (res) => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso(): void {
    this.router.navigate(['/financeiro', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private readForm(): FinancialViewModel {
    const form = this.form?.getRawValue()
    return {
      id: form.id as string,
      checkIn: new Date(form.checkIn as string),
      checkOut: new Date(form.checkOut as string),
      guestId: form.guestId as string,
      roomId: form.roomId as string,
      reservationValue: Number(form.reservationValue),
      additionalValue: Number(form.additionalValue),
      payment: form.paymentMethod as string
    }
  }

}
