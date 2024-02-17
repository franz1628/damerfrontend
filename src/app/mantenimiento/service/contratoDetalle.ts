import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ContratoDetalle } from '../interface/contratoDetalle';

export interface ResponseContratoDetalle {
  data: ContratoDetalle[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoDetalleService {
  private apiUrl = environments.baseUrl+'api/contratoDetalle'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getIdContrato(idContrato:number): Observable<ResponseContratoDetalle> {
    return this.http.get<ResponseContratoDetalle>(`${this.apiUrl}/getIdContrato/${idContrato}`);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<ContratoDetalle> {
    return this.http.post<ContratoDetalle>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<ContratoDetalle> {
    return this.http.post<ContratoDetalle>(`${this.apiUrl}/id/`, {id});
  }

  add(model: ContratoDetalle): Observable<ContratoDetalle> {
    return this.http.post<ContratoDetalle>(this.apiUrl, model);
  }

  addAll(model: ContratoDetalle[]): Observable<ContratoDetalle[]> {
    return this.http.post<ContratoDetalle[]>(`${this.apiUrl}/all/`, model);
  }

  borrarDetalle(idContrato:number): Observable<ResponseContratoDetalle> {
    return this.http.post<ResponseContratoDetalle>(`${this.apiUrl}/borrarDetalle/`, {idContrato});
  }

  update(id: number, model: ContratoDetalle): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ContratoDetalle): Observable<ContratoDetalle> {
    return this.http.delete<ContratoDetalle>(`${this.apiUrl}/${model.id}`);
  }
}