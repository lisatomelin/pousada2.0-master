import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListarHospedesViewModel } from '../models/listar-hospedes.View.Model';
import { environment } from 'src/environments/environment';
import { FormsHospedesViewModel } from '../models/forms-hospedes..View.Model';
import { VisualizarHospedesViewModel } from '../models/visualizar-hospedes.View.Model';

@Injectable({
  providedIn: 'root'
})
export class HospedesService {

  private API_URL = `${environment.API_URL}/Hospedes`;

  constructor(private http: HttpClient) {}

  criar(hospede: FormsHospedesViewModel): Observable<FormsHospedesViewModel> {
    return this.http.post<FormsHospedesViewModel>(this.API_URL, hospede);
  }

  selecionarPorId(id: string): Observable<VisualizarHospedesViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarHospedesViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }


}
