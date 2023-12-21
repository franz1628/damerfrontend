import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { Negocio } from '../interface/negocio.interface';
import { environments } from '../../../environments/environments';
import { Medicion } from '../interface/medicion';
import { TipoCambio } from '../interface/tipoCambio.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoCambioService {
  private apiUrl = environments.baseUrl+'api/tipoCambio'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: TipoCambio): Observable<TipoCambio> {
    return this.http.post<TipoCambio>(this.apiUrl, model);
  }

  update(id: number, model: TipoCambio): Observable<TipoCambio> {
    return this.http.put<TipoCambio>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoCambio): Observable<TipoCambio> {
    return this.http.delete<TipoCambio>(`${this.apiUrl}/${model.id}`);
  }
}