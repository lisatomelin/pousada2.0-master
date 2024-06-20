import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GuestViewModel } from '../models/guest-View.Model';

@Injectable({
  providedIn: 'root',
})
export class HospedesService {
  private API_URL = `${environment.API_URL}/guests`;

  constructor(private http: HttpClient) {}

  criar(hospede: GuestViewModel): Observable<GuestViewModel> {
    return this.http.post<GuestViewModel>(this.API_URL, hospede);
  }

  editar(id: string, hospede: GuestViewModel): Observable<GuestViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.put<GuestViewModel>(url, hospede);
  }

  excluir(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;

    return this.http.delete<GuestViewModel>(url);
  }

  selecionarPorId(id: string): Observable<GuestViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<any>(url).pipe(map((res) => res.dados));
  }

  selecionarTodos(): Observable<GuestViewModel[]> {
    return this.http.get<any>(this.API_URL).pipe(map((res) => res.dados));
  }
}
