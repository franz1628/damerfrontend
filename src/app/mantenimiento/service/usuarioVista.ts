import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { UsuarioVista } from '../interface/usuarioVista';

export interface ResponseUsuarioVistaOne {
  data: UsuarioVista,
  state: number,
  message: string
}
export interface ResponseUsuarioVista {
  data: UsuarioVista[],
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class UsuarioVistaService {
  private apiUrl = environments.baseUrl+'api/usuarioVista'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseUsuarioVista> {
    return this.http.get<ResponseUsuarioVista>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseUsuarioVistaOne> {
    return this.http.get<ResponseUsuarioVistaOne>(`${this.apiUrl}/${id}`);
  }


  add(model: UsuarioVista): Observable<ResponseUsuarioVistaOne> {
    return this.http.post<ResponseUsuarioVistaOne>(this.apiUrl, model);
  }

  update(id: number, model: UsuarioVista): Observable<ResponseUsuarioVistaOne> {
    return this.http.put<ResponseUsuarioVistaOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: UsuarioVista): Observable<UsuarioVista> {
    return this.http.delete<UsuarioVista>(`${this.apiUrl}/${model.id}`);
  }
}