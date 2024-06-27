import { Component, OnInit } from '@angular/core';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { ReservasService } from '../services/reservas.service';
import { Observable, forkJoin } from 'rxjs';
import { RoomsViewModel } from '../../quartos/models/rooms-View.Model';
import { GuestViewModel } from '../../hospedes/models/guest-View.Model';
import { HospedesService } from '../../hospedes/services/hospedes.service';
import { QuartosService } from '../../quartos/services/quartos.service';
import { NotificationService } from 'src/app/core/notification/services/notification.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.scss']
})
export class ListarReservasComponent implements OnInit {
  
  protected reservations: ReservationViewModel[] = [];
  
  private rooms: RoomsViewModel[] = [];
  private guests: GuestViewModel[] = [];

  constructor(
    private notification: NotificationService,
    private reservasService: ReservasService,
    private hospedeService: HospedesService,
    private quartoService: QuartosService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.reservasService.selecionarTodos(),
      this.hospedeService.selecionarTodos(),
      this.quartoService.selecionarTodos(),
    ])
    .subscribe({
      next: ([reservations, guests, rooms]) => {
        this.reservations = reservations;
        this.guests = guests;
        this.rooms = rooms;
      },
      error: (error) => this.processarFalha(error)
    });
  }

  protected formatarData(date: Date): string {
    let dataReal: string = date as unknown as string;
    console.log(date);
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
