import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ContratoHistorial } from '../interface/contratoHistorial';

export interface ResponseContratoHistorial {
  data: ContratoHistorial[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoHistorialService {
  private apiUrl = environments.baseUrl+'api/contratoHistorial'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  add(model: ContratoHistorial): Observable<ContratoHistorial> {
    return this.http.post<ContratoHistorial>(this.apiUrl, model);
  }

  update(id: number, model: ContratoHistorial): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ContratoHistorial): Observable<ContratoHistorial> {
    return this.http.delete<ContratoHistorial>(`${this.apiUrl}/${model.id}`);
  }
}