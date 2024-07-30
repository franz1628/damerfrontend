import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { UnidadVenta } from '../interface/unidadVenta';

export interface ResponseUnidadVenta {
  data: UnidadVenta[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UnidadVentaService {
  private apiUrl = environments.baseUrl+'api/unidadVenta'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseUnidadVenta> {
    return this.http.get<ResponseUnidadVenta>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: UnidadVenta): Observable<UnidadVenta> {
    return this.http.post<UnidadVenta>(this.apiUrl, model);
  }

  update(id: number, model: UnidadVenta): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: UnidadVenta): Observable<UnidadVenta> {
    return this.http.delete<UnidadVenta>(`${this.apiUrl}/${model.id}`);
  }
}