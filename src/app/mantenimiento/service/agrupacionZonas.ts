import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionZonas } from '../interface/agrupacionZonas';

export interface ResponseAgrupacionZonas {
  data: AgrupacionZonas[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionZonasService {
  private apiUrl = environments.baseUrl+'api/agrupacionZonas'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionZonas> {
    return this.http.get<ResponseAgrupacionZonas>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AgrupacionZonas): Observable<AgrupacionZonas> {
    return this.http.post<AgrupacionZonas>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionZonas): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionZonas): Observable<AgrupacionZonas> {
    return this.http.delete<AgrupacionZonas>(`${this.apiUrl}/${model.id}`);
  }
}