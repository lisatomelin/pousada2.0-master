import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinancialViewModel } from '../models/financial-View.Model';

@Injectable({
  providedIn: 'root',
})
export class FinanceiroService {
  private API_URL = `${environment.API_URL}/financial`;

  constructor(private http: HttpClient) {}

  editar(newGuest: FinancialViewModel): Observable<FinancialViewModel | undefined> {
    return this.http.put<FinancialViewModel>(this.API_URL, newGuest);
  }
  
  selecionarPorId(id: string): Observable<FinancialViewModel | undefined> {
      const url = `${this.API_URL}/${id}`;
      return this.http.get<any>(url);
    }
  
  selecionarTodos(): Observable<FinancialViewModel[]> {
    return this.http.get<any>(this.API_URL);
  }

  checkout(id: string): Observable<void> {
    const url = `${this.API_URL}/${id}/checkout`;
    return this.http.put<void>(url, null);
  }

}
