import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoTipoCambio } from '../interface/tipoTipoCambio.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoTipoCambioService {
  private apiUrl = environments.baseUrl+'api/tipoTipoCambio'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: TipoTipoCambio): Observable<TipoTipoCambio> {
    return this.http.post<TipoTipoCambio>(this.apiUrl, model);
  }

  update(id: number, model: TipoTipoCambio): Observable<TipoTipoCambio> {
    return this.http.put<TipoTipoCambio>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoTipoCambio): Observable<TipoTipoCambio> {
    return this.http.delete<TipoTipoCambio>(`${this.apiUrl}/${model.id}`);
  }
}