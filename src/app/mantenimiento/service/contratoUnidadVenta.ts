import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ContratoUnidadVenta } from '../interface/contratoUnidadVenta';

export interface ResponseContratoUnidadVenta {
  data: ContratoUnidadVenta[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoUnidadVentaService {
  private apiUrl = environments.baseUrl+'api/contratoUnidadVenta'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getIdContrato(idContrato:number): Observable<ResponseContratoUnidadVenta> {
    return this.http.get<ResponseContratoUnidadVenta>(`${this.apiUrl}/getIdContrato/${idContrato}`);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<ContratoUnidadVenta> {
    return this.http.post<ContratoUnidadVenta>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<ContratoUnidadVenta> {
    return this.http.post<ContratoUnidadVenta>(`${this.apiUrl}/id/`, {id});
  }

  add(model: ContratoUnidadVenta): Observable<ContratoUnidadVenta> {
    return this.http.post<ContratoUnidadVenta>(this.apiUrl, model);
  }

  addAll(model: ContratoUnidadVenta[]): Observable<ContratoUnidadVenta[]> {
    return this.http.post<ContratoUnidadVenta[]>(`${this.apiUrl}/all/`, model);
  }

  borrarDetalle(idContrato:number): Observable<ResponseContratoUnidadVenta> {
    return this.http.post<ResponseContratoUnidadVenta>(`${this.apiUrl}/borrarDetalle/`, {idContrato});
  }

  update(id: number, model: ContratoUnidadVenta): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ContratoUnidadVenta): Observable<ContratoUnidadVenta> {
    return this.http.delete<ContratoUnidadVenta>(`${this.apiUrl}/${model.id}`);
  }
}