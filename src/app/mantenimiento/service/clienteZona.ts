import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteZona } from '../interface/clienteZona';

export interface ResponseClienteZona {
  data: ClienteZona[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteZonaService {
  private apiUrl = environments.baseUrl+'api/clienteZona'; // Reemplaza con la URL de tu backend

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

  postIdCliente(idCliente: number): Observable<ResponseClienteZona> {
    return this.http.post<ResponseClienteZona>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  add(model: ClienteZona): Observable<ClienteZona> {
    return this.http.post<ClienteZona>(this.apiUrl, model);
  }

  update(id: number, model: ClienteZona): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteZona): Observable<ClienteZona> {
    return this.http.delete<ClienteZona>(`${this.apiUrl}/${model.id}`);
  }
}