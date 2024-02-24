import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Urbanizacion } from '../interface/urbanizacion';

export interface ResponseUrbanizacion {
  data: Urbanizacion[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UrbanizacionService {
  private apiUrl = environments.baseUrl+'api/urbanizacion';

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseUrbanizacion> {
    return this.http.get<ResponseUrbanizacion>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: Urbanizacion): Observable<Urbanizacion> {
    return this.http.post<Urbanizacion>(this.apiUrl, model);
  }

  update(id: number, model: Urbanizacion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Urbanizacion): Observable<Urbanizacion> {
    return this.http.delete<Urbanizacion>(`${this.apiUrl}/${model.id}`);
  }
}