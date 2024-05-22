import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteConcatenacion } from '../interface/clienteConcatenacion';

export interface ResponseClienteConcatenacion {
  data: ClienteConcatenacion[],
  state: number,
  message: string
}

export interface ResponseClienteConcatenacionOne {
  data: ClienteConcatenacion,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteConcatenacionService {
  private apiUrl = environments.baseUrl+'api/clienteConcatenacion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: ClienteConcatenacion): Observable<ClienteConcatenacion> {
    return this.http.post<ClienteConcatenacion>(this.apiUrl, model);
  }

  guardarConcatenacion(idAtributoFuncionalVariedadValor: number,idAtributoTecnicoVariedads:string,variables:string,separador:string): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/guardarConcatenacion`, {
      idAtributoFuncionalVariedadValor,
      idAtributoTecnicoVariedads,
      variables,
      separador
    });
  }

  postIdAtributoFuncionalVariedadValor(idAtributoFuncionalVariedadValor: number): Observable<ResponseClienteConcatenacionOne> {
    return this.http.post<ResponseClienteConcatenacionOne>(`${this.apiUrl}/idAtributoFuncionalVariedadValor`, {idAtributoFuncionalVariedadValor});
  }

  postCargaResultados(idAtributoFuncionalVariedadValor: number): Observable<ResponseClienteConcatenacion> {
    return this.http.post<ResponseClienteConcatenacion>(`${this.apiUrl}/cargaResultados`, {idAtributoFuncionalVariedadValor});
  }

  update(id: number, model: ClienteConcatenacion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteConcatenacion): Observable<ClienteConcatenacion> {
    return this.http.delete<ClienteConcatenacion>(`${this.apiUrl}/${model.id}`);
  }
}