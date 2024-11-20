import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoPresentacion } from '../interface/tipoPresentacion';

export interface ResponseTipoPresentacionOne {
  data: TipoPresentacion,
  state: number,
  message: string
}

export interface ResponseTipoPresentacion {
  data: TipoPresentacion[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class TipoPresentacionService {
  private apiUrl = environments.baseUrl+'api/tipoPresentacion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseTipoPresentacion> {
    return this.http.get<ResponseTipoPresentacion>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseTipoPresentacionOne> {
    return this.http.get<ResponseTipoPresentacionOne>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: TipoPresentacion): Observable<TipoPresentacion> {
    return this.http.post<TipoPresentacion>(this.apiUrl, model);
  }

  update(id: number, model: TipoPresentacion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoPresentacion): Observable<TipoPresentacion> {
    return this.http.delete<TipoPresentacion>(`${this.apiUrl}/${model.id}`);
  }
}