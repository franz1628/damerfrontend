import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionCanalCanal } from '../interface/agrupacionCanalCanal';

export interface ResponseAgrupacionCanalCanal {
  data: AgrupacionCanalCanal[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionCanalCanalService {
  private apiUrl = environments.baseUrl+'api/agrupacionCanalCanal'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionCanalCanal> {
    return this.http.get<ResponseAgrupacionCanalCanal>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AgrupacionCanalCanal): Observable<AgrupacionCanalCanal> {
    return this.http.post<AgrupacionCanalCanal>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionCanalCanal): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionCanalCanal): Observable<AgrupacionCanalCanal> {
    return this.http.delete<AgrupacionCanalCanal>(`${this.apiUrl}/${model.id}`);
  }
}