import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { uuidv4 } from 'src/app/core/utils/uuidv4';
import { environment } from 'src/environments/environment';
import { ReservationViewModel } from '../../reservas/models/reservation-View.Model';

const RESERVATIONS_KEY = 'reservations';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private API_URL = `${environment.API_URL}/reservations`;

  constructor(private http: HttpClient) {}



  selecionarPorId(id: string): Observable<ReservationViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<ReservationViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

}
