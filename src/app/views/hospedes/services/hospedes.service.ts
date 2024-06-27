import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const guests: GuestViewModel[] = this.getGuests();
    guest.id = uuidv4();
    guests.push(guest)
    this.setGuests(guests);
    return of(guest);
    // return this.http.post<GuestViewModel>(this.API_URL, hospede);
  }

  editar(id: string, newGuest: GuestViewModel): Observable<GuestViewModel | undefined> {
    const guests: GuestViewModel[] = this.getGuests();
    const registeredGuest: GuestViewModel | undefined = guests.find(guest => guest.id === id);
    if (!registeredGuest) {
      console.error(`Hóspede ${id} não encontrado`);
      return of(undefined);
    }
    registeredGuest.name = newGuest.name;
    registeredGuest.email = newGuest.email;
    registeredGuest.cpf = newGuest.cpf;
    registeredGuest.phoneNumber = newGuest.phoneNumber;
    this.setGuests(guests);
    return of(registeredGuest);
    // const url = `${this.API_URL}/${id}`;
    // return this.http.put<GuestViewModel>(url, hospede);
  }

  excluir(id: string): Observable<boolean> {
    const guests: GuestViewModel[] = this.getGuests();
    const guestIndex: number = guests.findIndex(guest => guest.id === id);
    if (guestIndex == -1) {
      console.error(guestIndex);
    } else {
      guests.splice(guestIndex, 1);
      this.setGuests(guests);
    }
    return of(true);
    // const url = `${this.API_URL}/${id}`;
    // return this.http.delete<GuestViewModel>(url);
  }

  selecionarPorId(id: string): Observable<GuestViewModel | undefined> {
    const guests: GuestViewModel[] = this.getGuests();
    return of(guests.find(guest => guest.id === id));
    // const url = `${this.API_URL}/${id}`;
    // return this.http.get<any>(url).pipe(map((res) => res.dados));
  }

  selecionarTodos(): Observable<GuestViewModel[]> {
    return of(this.getGuests());
    // return this.http.get<any>(this.API_URL).pipe(map((res) => res.dados));
  }

  private getGuests(): GuestViewModel[] {
    return JSON.parse(localStorage.getItem(GUESTS_KEY) || '[]');
  }

  private setGuests(guests: GuestViewModel[]): void {
    const json = JSON.stringify(guests);
    localStorage.setItem(GUESTS_KEY, json);
  }

}
