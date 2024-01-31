import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoInformeOrden } from '../interface/tipoInformeOrden';

@Injectable({
  providedIn: 'root' 
})
export class TipoInformeOrdenService {
  private apiUrl = environments.baseUrl+'api/TipoInformeOrden'; // Reemplaza con la URL de tu backend

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

  add(model: TipoInformeOrden): Observable<TipoInformeOrden> {
    return this.http.post<TipoInformeOrden>(this.apiUrl, model);
  }

  update(id: number, model: TipoInformeOrden): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoInformeOrden): Observable<TipoInformeOrden> {
    return this.http.delete<TipoInformeOrden>(`${this.apiUrl}/${model.id}`);
  }
}