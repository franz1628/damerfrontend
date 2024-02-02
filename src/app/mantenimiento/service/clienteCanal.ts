import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteCanal } from '../interface/clienteCanal';

export interface ResponseClienteCanal {
  data: ClienteCanal[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteCanalService {
  private apiUrl = environments.baseUrl+'api/clienteCanal'; // Reemplaza con la URL de tu backend

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

  postIdCliente(idCliente: number): Observable<ResponseClienteCanal> {
    return this.http.post<ResponseClienteCanal>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  add(model: ClienteCanal): Observable<ClienteCanal> {
    return this.http.post<ClienteCanal>(this.apiUrl, model);
  }

  update(id: number, model: ClienteCanal): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteCanal): Observable<ClienteCanal> {
    return this.http.delete<ClienteCanal>(`${this.apiUrl}/${model.id}`);
  }
}