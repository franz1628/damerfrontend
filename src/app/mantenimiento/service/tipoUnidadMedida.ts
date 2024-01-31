import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { TipoUnidadMedida } from '../interface/tipoUnidadMedida';

@Injectable({
  providedIn: 'root' 
})
export class TipoUnidadMedidaService {
  private apiUrl = environments.baseUrl+'api/tipoUnidadMedida'; // Reemplaza con la URL de tu backend

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

  add(model: TipoUnidadMedida): Observable<TipoUnidadMedida> {
    return this.http.post<TipoUnidadMedida>(this.apiUrl, model);
  }

  update(id: number, model: TipoUnidadMedida): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoUnidadMedida): Observable<TipoUnidadMedida> {
    return this.http.delete<TipoUnidadMedida>(`${this.apiUrl}/${model.id}`);
  }
}