import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Contrato } from '../interface/contrato';

export interface ResponseContrato {
  data: Contrato[],
  state: number,
  message: string
}

export interface ResponseContratoPost {
  data: Contrato,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = environments.baseUrl+'api/contrato'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getContratos(): Observable<ResponseContrato> {
    return this.http.get<ResponseContrato>(`${this.apiUrl}/contratos`);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postCodigo(codigo: number): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.apiUrl}/codigo`,{codigo});
  }

  postId(id: number): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.apiUrl}/id/`, {id});
  }

  add(model: Contrato): Observable<ResponseContratoPost> {
    return this.http.post<ResponseContratoPost>(this.apiUrl, model);
  }
  
  addVersion(id: number): Observable<ResponseContratoPost> {
    return this.http.post<ResponseContratoPost>(`${this.apiUrl}/addVersion/`, {id});
  }

  update(id: number, model: Contrato): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  updateEstado(id: number, model: object): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Contrato): Observable<Contrato> {
    return this.http.delete<Contrato>(`${this.apiUrl}/${model.id}`);
  }
}