import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { uuidv4 } from 'src/app/core/utils/uuidv4';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../models/reservation-View.Model';

const RESERVATIONS_KEY = 'reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_URL = `${environment.API_URL}/reservations`;

  constructor(private http: HttpClient) {}

  criar(reservation: ReservationViewModel): Observable<ReservationViewModel> {
    const reservations: ReservationViewModel[] = this.getReservations();
    reservation.id = uuidv4();
    reservations.push(reservation)
    this.setReservations(reservations);
    return of(reservation);
    // return this.http.post<ReservationViewModel>(this.API_URL, reserva);
  }

  editar(id: string, newReservation: ReservationViewModel): Observable<ReservationViewModel | undefined> {
    const reservations: ReservationViewModel[] = this.getReservations();
    const registeredReservation: ReservationViewModel | undefined = reservations.find(reservation => reservation.id === id);
    if (!registeredReservation) {
      console.error(`Reserva ${id} não encontrada`);
      return of(undefined);
    }
    registeredReservation.checkIn = newReservation.checkIn;
    registeredReservation.checkOut = newReservation.checkOut;
    registeredReservation.numberOfAdults = newReservation.numberOfAdults;
    registeredReservation.numberOfChildren = newReservation.numberOfChildren;
    registeredReservation.roomId = newReservation.roomId;
    registeredReservation.guestId = newReservation.guestId;
    this.setReservations(reservations);
    return of(registeredReservation);
  }

  excluir(id: string): Observable<boolean> {
    const reservations: ReservationViewModel[] = this.getReservations();
    const reservationIndex: number = reservations.findIndex(reservation => reservation.id === id);
    if (reservationIndex == -1) {
      console.error(reservationIndex);
    } else {
      reservations.splice(reservationIndex, 1);
      this.setReservations(reservations);
    }
    return of(true);
    // const url = `${this.API_URL}/${id}`;
    // return this.http.delete<ReservationViewModel>(url);
  }

  selecionarPorId(id: string): Observable<ReservationViewModel | undefined> {
    const reservations: ReservationViewModel[] = this.getReservations();
    return of(reservations.find(reservation => reservation.id === id));
    // const url = `${this.API_URL}/${id}`;
    // return this.http.get<any>(url)
    // .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return of(this.getReservations());
    // return this.http.get<any>(this.API_URL)
    // .pipe(map(res => res.dados));
  }

  private getReservations(): ReservationViewModel[] {
    return JSON.parse(localStorage.getItem(RESERVATIONS_KEY) || '[]');
  }

  private setReservations(reservations: ReservationViewModel[]): void {
    const json = JSON.stringify(reservations);
    localStorage.setItem(RESERVATIONS_KEY, json);
  }

}
