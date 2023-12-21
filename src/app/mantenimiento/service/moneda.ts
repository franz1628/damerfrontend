import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { Negocio } from '../interface/negocio.interface';
import { environments } from '../../../environments/environments';
import { Moneda } from '../interface/moneda';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private apiUrl = environments.baseUrl+'api/moneda'; // Reemplaza con la URL de tu backend

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

  add(model: Moneda): Observable<Moneda> {
    return this.http.post<Moneda>(this.apiUrl, model);
  }

  update(id: number, model: Moneda): Observable<Moneda> {
    return this.http.put<Moneda>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Moneda): Observable<Moneda> {
    return this.http.delete<Moneda>(`${this.apiUrl}/${model.id}`);
  }
}