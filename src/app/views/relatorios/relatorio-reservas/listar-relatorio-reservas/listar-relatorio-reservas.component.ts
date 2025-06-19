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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

  public dataInicial: Date | null = null;
  public dataFinal: Date | null = null;
  public reservasFiltradas: ReservationViewModel[] = [];

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
        this.reservasFiltradas = reservations;
        this.reports = reports;
        this.guests = guests;
        this.rooms = rooms;
      },
      error: (error) => this.processarFalha(error)
    });
  }

   public filtrarPorPeriodo(): void {
    if (this.dataInicial && this.dataFinal) {
      const inicio = new Date(this.dataInicial).setHours(0,0,0,0);
      const fim = new Date(this.dataFinal).setHours(23,59,59,999);
      this.reservasFiltradas = this.reservations.filter(reserva => {
        const checkIn = new Date(reserva.checkIn).getTime();
        return checkIn >= inicio && checkIn <= fim;
      });
    } else {
      this.reservasFiltradas = this.reservations;
    }
  }

  public gerarPDF(): void {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['DATA ENTRADA', 'DATA SAÍDA', 'Nº CRIANÇAS', 'Nº ADULTOS', 'QUARTO', 'HÓSPEDE']],
    body: this.reservasFiltradas.map(reserva => [
      this.formatarData(reserva.checkIn),
      this.formatarData(reserva.checkOut),
      reserva.numberOfChildren,
      reserva.numberOfAdults,
      this.buscaDescricaoQuarto(reserva.roomId),
      this.buscaNomeHospede(reserva.guestId)
    ])
  });
  doc.save('relatorio-reservas.pdf');
}

  public gerarExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
      this.reservasFiltradas.map(reserva => ({
        'DATA ENTRADA': this.formatarData(reserva.checkIn),
        'DATA SAÍDA': this.formatarData(reserva.checkOut),
        'Nº CRIANÇAS': reserva.numberOfChildren,
        'Nº ADULTOS': reserva.numberOfAdults,
        'QUARTO': this.buscaDescricaoQuarto(reserva.roomId),
        'HÓSPEDE': this.buscaNomeHospede(reserva.guestId)
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatórios');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'relatorio-reservas.xlsx');
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
