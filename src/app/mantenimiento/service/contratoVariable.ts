import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ContratoVariable } from '../interface/contratoVariable';

export interface ResponseContratoVariable {
  data: ContratoVariable[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoVariableService {
  private apiUrl = environments.baseUrl+'api/contratoVariable'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getIdContrato(idContrato:number): Observable<ResponseContratoVariable> {
    return this.http.get<ResponseContratoVariable>(`${this.apiUrl}/getIdContrato/${idContrato}`);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<ContratoVariable> {
    return this.http.post<ContratoVariable>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<ContratoVariable> {
    return this.http.post<ContratoVariable>(`${this.apiUrl}/id/`, {id});
  }

  add(model: ContratoVariable): Observable<ContratoVariable> {
    return this.http.post<ContratoVariable>(this.apiUrl, model);
  }

  addAll(model: ContratoVariable[]): Observable<ContratoVariable[]> {
    return this.http.post<ContratoVariable[]>(`${this.apiUrl}/all/`, model);
  }

  borrarDetalle(idContrato:number): Observable<ResponseContratoVariable> {
    return this.http.post<ResponseContratoVariable>(`${this.apiUrl}/borrarDetalle/`, {idContrato});
  }

  update(id: number, model: ContratoVariable): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ContratoVariable): Observable<ContratoVariable> {
    return this.http.delete<ContratoVariable>(`${this.apiUrl}/${model.id}`);
  }
}