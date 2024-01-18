import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Cliente } from '../interface/cliente';
import { ClienteContacto } from '../interface/clienteContacto';

@Injectable({
  providedIn: 'root'
})
export class ClienteContactoService {
  private apiUrl = environments.baseUrl+'api/clienteContacto'; // Reemplaza con la URL de tu backend

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

  add(model: ClienteContacto): Observable<ClienteContacto> {
    return this.http.post<ClienteContacto>(this.apiUrl, model);
  }

  update(id: number, model: ClienteContacto): Observable<ClienteContacto> {
    return this.http.put<ClienteContacto>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteContacto): Observable<ClienteContacto> {
    return this.http.delete<ClienteContacto>(`${this.apiUrl}/${model.id}`);
  }
}