import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { uuidv4 } from 'src/app/core/utils/uuidv4';
import { environment } from 'src/environments/environment';
import { GuestViewModel } from '../models/guest-View.Model';

const GUESTS_KEY = 'guests';

@Injectable({
  providedIn: 'root',
})
export class HospedesService {
  private API_URL = `${environment.API_URL}/guests`;

  constructor(private http: HttpClient) {}

  criar(guest: GuestViewModel): Observable<GuestViewModel> {
    return this.http.post<GuestViewModel>(this.API_URL, guest);
  }

  editar(id: string, newGuest: GuestViewModel): Observable<GuestViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<GuestViewModel>(url, newGuest);
  }

  excluir(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<boolean>(url);
  }

  selecionarPorId(id: string): Observable<GuestViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<GuestViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

}
