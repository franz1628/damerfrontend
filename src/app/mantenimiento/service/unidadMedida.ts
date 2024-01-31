import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { UnidadMedida } from '../interface/unidadMedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private apiUrl = environments.baseUrl+'api/UnidadMedida'; // Reemplaza con la URL de tu backend

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

  postCodTipoUnidadMedida(codTipoUnidadMedida: number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/codTipoUnidadMedida/`,{codTipoUnidadMedida});
  }

  add(model: UnidadMedida): Observable<UnidadMedida> {
    return this.http.post<UnidadMedida>(this.apiUrl, model);
  }

  update(id: number, model: UnidadMedida): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: UnidadMedida): Observable<UnidadMedida> {
    return this.http.delete<UnidadMedida>(`${this.apiUrl}/${model.id}`);
  }
}