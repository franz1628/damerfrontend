import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoInformeOrden } from '../interface/tipoInformeOrden';

export interface ResponseTipoInformeOrden {
  data: TipoInformeOrden[],
  state: number,
  message: string
}

export interface ResponseTipoInformeOrdenOne {
  data: TipoInformeOrden,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root' 
})
export class TipoInformeOrdenService {
  private apiUrl = environments.baseUrl+'api/TipoInformeOrden'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseTipoInformeOrdenOne> {
    return this.http.get<ResponseTipoInformeOrdenOne>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`); 
  }

  add(model: TipoInformeOrden): Observable<ResponseTipoInformeOrdenOne> {
    return this.http.post<ResponseTipoInformeOrdenOne>(this.apiUrl, model);
  }

  update(id: number, model: TipoInformeOrden): Observable<ResponseTipoInformeOrdenOne> {
    return this.http.put<ResponseTipoInformeOrdenOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoInformeOrden): Observable<TipoInformeOrden> {
    return this.http.delete<TipoInformeOrden>(`${this.apiUrl}/${model.id}`);
  }
}