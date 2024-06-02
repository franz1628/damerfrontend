import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoFuncionalVariedad } from '../interface/atributoFuncionalVariedad';

export interface ResponseAtributoFuncionalVariedad {
  data: AtributoFuncionalVariedad[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AtributoFuncionalVariedadService {
  private apiUrl = environments.baseUrl+'api/atributoFuncionalVariedad'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getIdClienteIdCategoria(idCliente: number, idCategoria:number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/idCliente/${idCliente}/${idCategoria}`);
  }

  postIdClienteIdCategoria(idCliente: number, idCategoria:number): Observable<ResponseAtributoFuncionalVariedad> {
    return this.http.post<ResponseAtributoFuncionalVariedad>(`${this.apiUrl}/idClienteidCategoria/`,{idCliente,idCategoria});
  }
  postIdClienteAgrupacionCategoria(idCliente: number, idClienteAgrupacionCategoria:number): Observable<ResponseAtributoFuncionalVariedad> {
    return this.http.post<ResponseAtributoFuncionalVariedad>(`${this.apiUrl}/idClienteAgrupacionCategoria/`,{idCliente,idClienteAgrupacionCategoria});
  }


  add(model: AtributoFuncionalVariedad): Observable<AtributoFuncionalVariedad> {
    return this.http.post<AtributoFuncionalVariedad>(this.apiUrl, model);
  }

  update(id: number, model: AtributoFuncionalVariedad): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoFuncionalVariedad): Observable<AtributoFuncionalVariedad> {
    return this.http.delete<AtributoFuncionalVariedad>(`${this.apiUrl}/${model.id}`);
  }
}