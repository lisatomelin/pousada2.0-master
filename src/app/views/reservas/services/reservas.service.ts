import { Injectable } from '@angular/core';
import { ReservationViewModel } from '../models/reservation-View.Model';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_URL = `${environment.API_URL}/reservations`;

  constructor(private http: HttpClient) {}

  criar(reserva: ReservationViewModel): Observable<ReservationViewModel> {
    return this.http.post<ReservationViewModel>(this.API_URL, reserva);
  }

  editar(id: string, reserva: ReservationViewModel): Observable<ReservationViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<ReservationViewModel>(url, reserva);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<ReservationViewModel>(url);
  }

  selecionarPorId(id: string): Observable<ReservationViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }


}
