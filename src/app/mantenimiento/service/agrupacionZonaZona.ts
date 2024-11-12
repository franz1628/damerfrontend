import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionZonaZona } from '../interface/agrupacionZonaZona';

export interface ResponseAgrupacionZonaZona {
  data: AgrupacionZonaZona[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionZonaZonaService {
  private apiUrl = environments.baseUrl+'api/agrupacionZonaZona'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionZonaZona> {
    return this.http.get<ResponseAgrupacionZonaZona>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AgrupacionZonaZona): Observable<AgrupacionZonaZona> {
    return this.http.post<AgrupacionZonaZona>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionZonaZona): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionZonaZona): Observable<AgrupacionZonaZona> {
    return this.http.delete<AgrupacionZonaZona>(`${this.apiUrl}/${model.id}`);
  }
}