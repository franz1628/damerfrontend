import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Vista } from '../interface/vista';

export interface ResponseVistaOne {
  data: Vista,
  state: number,
  message: string
}
export interface ResponseVista {
  data: Vista[],
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class VistaService {

  private apiUrl = environments.baseUrl+'api/vista'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseVista> {
    return this.http.get<ResponseVista>(this.apiUrl);
  }

  getByUsuario(id: number): Observable<ResponseVista> {
    return this.http.get<ResponseVista>(`${this.apiUrl}/usuario/${id}`);
  }

  getId(id: number): Observable<ResponseVistaOne> {
    return this.http.get<ResponseVistaOne>(`${this.apiUrl}/${id}`);
  }


  add(model: Vista): Observable<ResponseVistaOne> {
    return this.http.post<ResponseVistaOne>(this.apiUrl, model);
  }

  update(id: number, model: Vista): Observable<ResponseVistaOne> {
    return this.http.put<ResponseVistaOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Vista): Observable<Vista> {
    return this.http.delete<Vista>(`${this.apiUrl}/${model.id}`);
  }
}