import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoMoneda } from '../interface/tipoMoneda';


export interface ResponseTipoMonedaOne {
  data: TipoMoneda,
  state: number,
  message: string
}

export interface ResponseTipoMoneda {
  data: TipoMoneda[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class TipoMonedaService {
  private apiUrl = environments.baseUrl+'api/tipoMoneda'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseTipoMoneda> {
    return this.http.get<ResponseTipoMoneda>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseTipoMonedaOne> {
    return this.http.get<ResponseTipoMonedaOne>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: TipoMoneda): Observable<TipoMoneda> {
    return this.http.post<TipoMoneda>(this.apiUrl, model);
  }

  update(id: number, model: TipoMoneda): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoMoneda): Observable<TipoMoneda> {
    return this.http.delete<TipoMoneda>(`${this.apiUrl}/${model.id}`);
  }
}