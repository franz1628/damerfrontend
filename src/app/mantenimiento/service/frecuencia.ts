import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Frecuencia } from '../interface/frecuencia';

@Injectable({
  providedIn: 'root'
})
export class FrecuenciaService {
  private apiUrl = environments.baseUrl+'api/frecuencia'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: Frecuencia): Observable<Frecuencia> {
    return this.http.post<Frecuencia>(this.apiUrl, model);
  }

  update(id: number, model: Frecuencia): Observable<Frecuencia> {
    return this.http.put<Frecuencia>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Frecuencia): Observable<Frecuencia> {
    return this.http.delete<Frecuencia>(`${this.apiUrl}/${model.id}`);
  }
}