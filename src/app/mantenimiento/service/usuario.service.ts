import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoMoneda } from '../interface/tipoMoneda';
import { Usuario } from '../../login/interfaces/usuario';



export interface ResponseUsuarioOne {
  data: Usuario,
  state: number,
  message: string
}

export interface ResponseUsuario {
  data: Usuario[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environments.baseUrl+'api/Usuario'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseUsuarioOne> {
    return this.http.get<ResponseUsuarioOne>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: Usuario): Observable<ResponseUsuarioOne> {
    return this.http.post<ResponseUsuarioOne>(this.apiUrl, model);
  }

  update(id: number, model: Usuario): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  updateCargo(id: number, idCargo:number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/updateCargo/${id}`, {idCargo});
  }

  delete(model: Usuario): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}/${model.id}`);
  }

  updateVistas(id: number, vistas: number[][]): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/updateVistas/${id}`, { vistas });
  }
}