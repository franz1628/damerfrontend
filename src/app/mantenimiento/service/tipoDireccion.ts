import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoDireccion } from '../components/variedades/interfaces/tipoDireccion';

export interface ResponseTipoDireccion {
  data: TipoDireccion[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class TipoDireccionService {
  private apiUrl = environments.baseUrl+'api/tipoDireccion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseTipoDireccion> {
    return this.http.get<ResponseTipoDireccion>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<TipoDireccion> {
    return this.http.post<TipoDireccion>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<TipoDireccion> {
    return this.http.post<TipoDireccion>(`${this.apiUrl}/id/`, {id});
  }

  add(model: TipoDireccion): Observable<TipoDireccion> {
    return this.http.post<TipoDireccion>(this.apiUrl, model);
  }

  update(id: number, model: TipoDireccion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoDireccion): Observable<TipoDireccion> {
    return this.http.delete<TipoDireccion>(`${this.apiUrl}/${model.id}`);
  }
}