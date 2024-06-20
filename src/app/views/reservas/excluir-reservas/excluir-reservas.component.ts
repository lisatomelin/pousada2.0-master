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
  reservasVM?: Observable<ReservationViewModel>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservasService: ReservasService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.reservasVM = this.route.data.pipe(map((res) => res['reserva']));
  }

  gravar() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.reservasService.excluir(id).subscribe({
      next: () => this.processarSucesso(),
      error: (err) => this.processarFalha(err),
    });
  }

  processarSucesso() {
    this.notification.sucesso('A Reserva foi excluída com sucesso!');

    this.router.navigate(['/reservas/listar']);
  }

  processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}
