import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Cliente } from '../interface/cliente';

export interface ResponseClienteOne {
  data: Cliente,
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = environments.baseUrl+'api/cliente'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/id/`, {id});
  }

  add(model: Cliente): Observable<ResponseClienteOne> {
    return this.http.post<ResponseClienteOne>(this.apiUrl, model);
  }

  update(id: number, model: Cliente): Observable<ResponseClienteOne> {
    return this.http.put<ResponseClienteOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${model.id}`);
  }
}