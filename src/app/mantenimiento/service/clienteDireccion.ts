import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Cliente } from '../interface/cliente';
import { ClienteDireccion } from '../interface/clienteDireccion';

@Injectable({
  providedIn: 'root'
})
export class ClienteDireccionService {
  private apiUrl = environments.baseUrl+'api/clienteDireccion'; // Reemplaza con la URL de tu backend

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

  getCodCliente(codCliente: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codCliente/${codCliente}`);
  }

  add(model: ClienteDireccion): Observable<ClienteDireccion> {
    return this.http.post<ClienteDireccion>(this.apiUrl, model);
  }

  update(id: number, model: ClienteDireccion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteDireccion): Observable<ClienteDireccion> {
    return this.http.delete<ClienteDireccion>(`${this.apiUrl}/${model.id}`);
  }
}