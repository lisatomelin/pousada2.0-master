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
    const rooms: RoomsViewModel[] = this.getRooms();
    room.id = uuidv4();
    rooms.push(room)
    this.setRooms(rooms);
    return of(room);
    // return this.http.post<RoomsViewModel>(this.API_URL, rooms);
  }

  editar(id: string, quarto: RoomsViewModel): Observable<RoomsViewModel | undefined> {
    const rooms: RoomsViewModel[] = this.getRooms();
    const oldRoom: RoomsViewModel | undefined = rooms.find(room => room.id === id);
    if (!oldRoom) {
      console.error(`Quarto ${id} não encontrado`);
      return of(undefined);
    }
    oldRoom.number = quarto.number;
    oldRoom.floor = quarto.floor;
    oldRoom.description = quarto.description;
    oldRoom.capacity = quarto.capacity;
    this.setRooms(rooms);
    return of(oldRoom);
    // const url = `${this.API_URL}/${id}`;
    // return this.http.put<RoomsViewModel>(url, quarto);
  }

  excluir(id: string): Observable<boolean> {
    const rooms: RoomsViewModel[] = this.getRooms();
    const roomIndex: number = rooms.findIndex(room => room.id === id);
    if (roomIndex == -1) {
      console.error(roomIndex);
    } else {
      rooms.splice(roomIndex, 1);
      this.setRooms(rooms);
    }
    return of(true);
    // const url = `${this.API_URL}/${id}`;
    // return this.http.delete<RoomsViewModel>(url);
  }

  selecionarPorId(id: string): Observable<RoomsViewModel | undefined> {
    const rooms: RoomsViewModel[] = this.getRooms();
    return of(rooms.find(room => room.id === id));
    // const url = `${this.API_URL}/${id}`;
    // return this.http.get<any>(url)
    // .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<RoomsViewModel[]> {
    return of(this.getRooms());
    // return this.http.get<any>(this.API_URL)
    // .pipe(map(res => res.dados));
  }

  private getRooms(): RoomsViewModel[] {
    return JSON.parse(localStorage.getItem(ROOMS_KEY) || '[]');
  }

  private setRooms(rooms: RoomsViewModel[]): void {
    const json = JSON.stringify(rooms);
    localStorage.setItem(ROOMS_KEY, json);
  }

}
