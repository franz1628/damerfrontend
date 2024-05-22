import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionCanalsDetalle } from '../interface/agrupacionCanalsDetalle';

export interface ResponseAgrupacionCanalsDetalle {
  data: AgrupacionCanalsDetalle[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionCanalsDetalleService {
  private apiUrl = environments.baseUrl+'api/agrupacionCanalsDetalle'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionCanalsDetalle> {
    return this.http.get<ResponseAgrupacionCanalsDetalle>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postIdAgrupacionCanals(idAgrupacionCanals:number): Observable<ResponseAgrupacionCanalsDetalle> {
    return this.http.post<ResponseAgrupacionCanalsDetalle>(`${this.apiUrl}/idAgrupacionCanals`, {idAgrupacionCanals});
  }

  add(model: AgrupacionCanalsDetalle): Observable<AgrupacionCanalsDetalle> {
    return this.http.post<AgrupacionCanalsDetalle>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionCanalsDetalle): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionCanalsDetalle): Observable<AgrupacionCanalsDetalle> {
    return this.http.delete<AgrupacionCanalsDetalle>(`${this.apiUrl}/${model.id}`);
  }
}