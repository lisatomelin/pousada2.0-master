import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoomsViewModel } from '../models/rooms-View.Model';


@Injectable({
  providedIn: 'root'
})
export class QuartosService {

  private API_URL = `${environment.API_URL}/rooms`;

  constructor(private http: HttpClient) {}

  criar(rooms: RoomsViewModel): Observable<RoomsViewModel> {
    return this.http.post<RoomsViewModel>(this.API_URL, rooms);
  }

  selecionarPorId(id: string): Observable<RoomsViewModel> {
    const url = `${this.API_URL}/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<RoomsViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }
}
