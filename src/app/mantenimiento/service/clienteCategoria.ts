import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Cliente } from '../interface/cliente';
import { ClienteCategoria } from '../interface/clienteCategoria';

export interface ResponseClienteCategoria {
  data: ClienteCategoria[],
  state: number,
  message: string
}



@Injectable({
  providedIn: 'root'
})
export class ClienteCategoriaService {
  private apiUrl = environments.baseUrl+'api/clienteCategoria'; // Reemplaza con la URL de tu backend

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

  add(model: ClienteCategoria): Observable<ClienteCategoria> {
    return this.http.post<ClienteCategoria>(this.apiUrl, model);
  }

  postIdCliente(idCliente: number): Observable<ResponseClienteCategoria> {
    return this.http.post<ResponseClienteCategoria>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  update(id: number, model: ClienteCategoria): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteCategoria): Observable<ClienteCategoria> {
    return this.http.delete<ClienteCategoria>(`${this.apiUrl}/${model.id}`);
  }
}