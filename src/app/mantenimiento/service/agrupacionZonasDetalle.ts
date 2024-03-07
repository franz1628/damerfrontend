import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionZonasDetalle } from '../interface/agrupacionZonasDetalle';

export interface ResponseAgrupacionZonasDetalle {
  data: AgrupacionZonasDetalle[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionZonasDetalleService {
  private apiUrl = environments.baseUrl+'api/agrupacionZonasDetalle'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionZonasDetalle> {
    return this.http.get<ResponseAgrupacionZonasDetalle>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postIdAgrupacionZonas(idAgrupacionZonas:number): Observable<ResponseAgrupacionZonasDetalle> {
    return this.http.post<ResponseAgrupacionZonasDetalle>(`${this.apiUrl}/idAgrupacionZonas`, {idAgrupacionZonas});
  }

  add(model: AgrupacionZonasDetalle): Observable<AgrupacionZonasDetalle> {
    return this.http.post<AgrupacionZonasDetalle>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionZonasDetalle): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionZonasDetalle): Observable<AgrupacionZonasDetalle> {
    return this.http.delete<AgrupacionZonasDetalle>(`${this.apiUrl}/${model.id}`);
  }
}