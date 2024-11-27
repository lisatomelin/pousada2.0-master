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
    return this.http.post<ReservationViewModel>(this.API_URL, reservation);
  }

  editar(id: string, newReservation: ReservationViewModel): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<ReservationViewModel>(url, newReservation);
  }

  excluir(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<boolean>(url);
  }

  selecionarPorId(id: string): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

}
