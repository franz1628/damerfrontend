import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoFuncionalVariedadValor } from '../interface/atributoFuncionalVariedadValor';

export interface ResponseAtributoFuncionalVariedadValor {
  data: AtributoFuncionalVariedadValor[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AtributoFuncionalVariedadValorService {
  private apiUrl = environments.baseUrl+'api/atributoFuncionalVariedadValor'; // Reemplaza con la URL de tu backend

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

  postIdAtributoFuncionalVariedad(idAtributoFuncionalVariedad: number): Observable<ResponseAtributoFuncionalVariedadValor> {
    return this.http.post<ResponseAtributoFuncionalVariedadValor>(`${this.apiUrl}/idAtributoFuncionalVariedad/`,{idAtributoFuncionalVariedad});
  }

  add(model: AtributoFuncionalVariedadValor): Observable<AtributoFuncionalVariedadValor> {
    return this.http.post<AtributoFuncionalVariedadValor>(this.apiUrl, model);
  }

  update(id: number, model: AtributoFuncionalVariedadValor): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoFuncionalVariedadValor): Observable<AtributoFuncionalVariedadValor> {
    return this.http.delete<AtributoFuncionalVariedadValor>(`${this.apiUrl}/${model.id}`);
  }
}