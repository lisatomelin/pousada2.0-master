import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { uuidv4 } from 'src/app/core/utils/uuidv4';
import { environment } from 'src/environments/environment';
import { RoomsViewModel } from './../models/rooms-View.Model';

const ROOMS_KEY = 'rooms';

@Injectable({
  providedIn: 'root'
})
export class QuartosService {

  private API_URL = `${environment.API_URL}/rooms`;

  constructor(private http: HttpClient) {}

  criar(room: RoomsViewModel): Observable<RoomsViewModel> {
    return this.http.post<RoomsViewModel>(this.API_URL, room);
  }

  editar(id: string, quarto: RoomsViewModel): Observable<RoomsViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<RoomsViewModel>(url, quarto);
  }

  excluir(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<boolean>(url);
  }

  selecionarPorId(id: string): Observable<RoomsViewModel | undefined> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }

  selecionarTodos(): Observable<RoomsViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

}
