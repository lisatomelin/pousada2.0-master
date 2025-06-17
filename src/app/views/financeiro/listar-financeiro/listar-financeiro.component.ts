import { FinanceiroService } from './../services/financeiro.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { FinancialViewModel } from '../models/financial-View.Model';
import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-financeiro',
  templateUrl: './listar-financeiro.component.html',
  styleUrls: ['./listar-financeiro.component.scss'],
})
export class ListarFinanceiroComponent implements OnInit {
  financeiro$?: Observable<FinancialViewModel[]>;

  constructor(
    private notification: NotificationService,
    private financeiroService: FinanceiroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findReservas();
  }

  checkoutReserva(financeiro: FinancialViewModel): void {
    if (financeiro.status === 'Finalizado') return;
    this.financeiroService.checkout(financeiro.id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso(
      "CheckOut realizado com sucesso!"
    );
    this.findReservas();
  }

  toEdit(financeiro: FinancialViewModel): void {
    if (financeiro.status === 'Finalizado') return;
    this.router.navigate([`/financeiro/editar/${financeiro.id}`])
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }

  private findReservas() {
    this.financeiro$ = this.financeiroService.selecionarTodos();
  }

}
