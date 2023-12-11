import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { Negocio } from '../interface/negocio.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NegocioService {
  private apiUrl = environments.baseUrl+'api/negocio'; // Reemplaza con la URL de tu backend

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

  add(model: Negocio): Observable<Negocio> {
    return this.http.post<Negocio>(this.apiUrl, model);
  }

  update(id: number, model: Negocio): Observable<Negocio> {
    return this.http.put<Negocio>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Negocio): Observable<Negocio> {
    return this.http.delete<Negocio>(`${this.apiUrl}/${model.id}`);
  }
}