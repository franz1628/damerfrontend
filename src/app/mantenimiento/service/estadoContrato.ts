import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { EstadoContrato } from '../interface/estadoContrato';

export interface ResponseEstadoContrato {
  data: EstadoContrato[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class EstadoContratoService {
  private apiUrl = environments.baseUrl+'api/estadoContrato'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  } 

  add(model: EstadoContrato): Observable<EstadoContrato> {
    return this.http.post<EstadoContrato>(this.apiUrl, model);
  }
 
  update(id: number, model: EstadoContrato): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: EstadoContrato): Observable<EstadoContrato> {
    return this.http.delete<EstadoContrato>(`${this.apiUrl}/${model.id}`);
  }
}