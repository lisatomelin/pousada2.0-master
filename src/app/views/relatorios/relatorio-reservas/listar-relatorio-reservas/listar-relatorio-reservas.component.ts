import { Component, OnInit } from '@angular/core';

import { forkJoin, Observable,  } from 'rxjs';

import { NotificationService } from 'src/app/core/notification/services/notification.service';
import { GuestViewModel } from 'src/app/views/hospedes/models/guest-View.Model';
import { HospedesService } from 'src/app/views/hospedes/services/hospedes.service';
import { RoomsViewModel } from 'src/app/views/quartos/models/rooms-View.Model';
import { QuartosService } from 'src/app/views/quartos/services/quartos.service';
import { ReservationViewModel } from 'src/app/views/reservas/models/reservation-View.Model';
import { ReservasService } from 'src/app/views/reservas/services/reservas.service';
import { RelatoriosService } from '../../services/relatorios.service';
import { RelatoriosViewModel } from '../../models/relatorios-View.Model';


@Component({
  selector: 'app-listar-relatorio-reservas',
  templateUrl: './listar-relatorio-reservas.component.html',
  styleUrls: ['./listar-relatorio-reservas.component.scss']
})
export class ListarRelatorioReservasComponent implements OnInit {


  protected reports: RelatoriosViewModel[] = [];
  protected reservations: ReservationViewModel[] = [];

  private rooms: RoomsViewModel[] = [];
  private guests: GuestViewModel[] = [];

  constructor(
    private notification: NotificationService,
    private relatoriosService: RelatoriosService,
    private reservasService: ReservasService,
    private hospedeService: HospedesService,
    private quartoService: QuartosService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.relatoriosService.selecionarTodos(),
      this.reservasService.selecionarTodos(),
      this.hospedeService.selecionarTodos(),
      this.quartoService.selecionarTodos(),
    ])
    .subscribe({
      next: ([reservations, reports, guests, rooms]) => {
        this.reservations = reservations;
        this.reports = reports;
        this.guests = guests;
        this.rooms = rooms;
      },
      error: (error) => this.processarFalha(error)
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

  protected buscaDescricaoQuarto(id: string): string {
    let descricao: string = '';
    const room: RoomsViewModel | undefined = this.rooms.find(room => room.id === id);
    if (room) {
      descricao = room.description;
    } else {
      console.error(`Quarto não encontrado: ${id}`);
      descricao = 'Quarto não encontrado';
    }
    return descricao;
  }

  protected buscaNomeHospede(id: string): string {
    let descricao: string = '';
    const guest: GuestViewModel | undefined = this.guests.find(item => item.id === id);
    if (guest) {
      descricao = guest.name;
    } else {
      console.error(`Hóspede não encontrado: ${id}`);
      descricao = 'Hóspede não encontrado';
    }
    return descricao;
  }

  private processarFalha(err: any) {
    this.notification.erro(err.error.erros[0]);
  }
}
