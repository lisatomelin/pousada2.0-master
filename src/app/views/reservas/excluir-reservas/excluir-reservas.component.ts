import { ReservationViewModel } from './../models/reservation-View.Model';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ReservasService } from '../services/reservas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-excluir-reservas',
  templateUrl: './excluir-reservas.component.html',
  styleUrls: ['./excluir-reservas.component.scss'],
})
export class ExcluirReservasComponent implements OnInit {
  reservasVM?: Observable<ReservationViewModel | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.reservasVM = this.reservasService.selecionarPorId(id)
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.reservasService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  protected formatarData(date: Date): string {
    let dataReal: string = date as unknown as string;
    if (dataReal.includes('T')) {
      dataReal = dataReal.split('T')[0];
    }
    if (dataReal.includes('-')){
      const auxiliary: string[] = dataReal.split('-');
      dataReal = auxiliary.reverse().join('/');
    }
    return dataReal;
  }

  processarSucesso() {
    this.notification.sucesso('A Reserva foi excluída com sucesso!');
    this.router.navigate(['/reservas', 'listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}
