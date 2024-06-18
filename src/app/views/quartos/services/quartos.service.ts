import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormsQuartosViewModel } from '../models/forms-quartos.View.Model';
import { ListarQuartosViewModel } from '../models/listar-quartos.View.Model';
import { VisualizarQuartosViewModel } from '../models/visualizar-quartos.View.Model';

@Injectable({
  providedIn: 'root'
})
export class QuartosService {

  private API_URL = `${environment.API_URL}/Quartos`;

  constructor(private http: HttpClient) {}

  criar(quarto: FormsQuartosViewModel): Observable<FormsQuartosViewModel> {
    return this.http.post<FormsQuartosViewModel>(this.API_URL, quarto);
  }

  selecionarPorId(id: string): Observable<VisualizarQuartosViewModel> {
    const url = `${this.API_URL}/visualizacao-completa/${id}`;

    return this.http.get<any>(url)
    .pipe(map(res => res.dados));
  }

  selecionarTodos(): Observable<ListarQuartosViewModel[]> {
    return this.http.get<any>(this.API_URL)
    .pipe(map(res => res.dados));
  }
}
