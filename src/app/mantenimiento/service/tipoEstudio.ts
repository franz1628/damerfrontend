import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoEstudio } from '../interface/tipoEstudio';

export interface ResponseTipoEstudioOne {
  data: TipoEstudio,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class TipoEstudioService {
  private apiUrl = environments.baseUrl+'api/TipoEstudio'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseTipoEstudioOne> {
    return this.http.get<ResponseTipoEstudioOne>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: TipoEstudio): Observable<TipoEstudio> {
    return this.http.post<TipoEstudio>(this.apiUrl, model);
  }

  update(id: number, model: TipoEstudio): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoEstudio): Observable<TipoEstudio> {
    return this.http.delete<TipoEstudio>(`${this.apiUrl}/${model.id}`);
  }
}