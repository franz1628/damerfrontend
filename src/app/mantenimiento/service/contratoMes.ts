import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ContratoMes } from '../interface/contratoMes';

export interface ResponseContratoMes {
  data: ContratoMes[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoMesService {
  private apiUrl = environments.baseUrl+'api/contratoMes'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getIdContrato(idContrato:number): Observable<ResponseContratoMes> {
    return this.http.get<ResponseContratoMes>(`${this.apiUrl}/getIdContrato/${idContrato}`);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<ContratoMes> {
    return this.http.post<ContratoMes>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<ContratoMes> {
    return this.http.post<ContratoMes>(`${this.apiUrl}/id/`, {id});
  }

  add(model: ContratoMes): Observable<ContratoMes> {
    return this.http.post<ContratoMes>(this.apiUrl, model);
  }

  addAll(model: ContratoMes[]): Observable<ContratoMes[]> {
    return this.http.post<ContratoMes[]>(`${this.apiUrl}/all/`, model);
  }

  borrarDetalle(idContrato:number): Observable<ResponseContratoMes> {
    return this.http.post<ResponseContratoMes>(`${this.apiUrl}/borrarDetalle/`, {idContrato});
  }

  update(id: number, model: ContratoMes): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ContratoMes): Observable<ContratoMes> {
    return this.http.delete<ContratoMes>(`${this.apiUrl}/${model.id}`);
  }
}