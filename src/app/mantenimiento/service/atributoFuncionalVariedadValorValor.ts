import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoFuncionalVariedadValorValor } from '../interface/atributoFuncionalVariedadValorValor';

export interface ResponseAtributoFuncionalVariedadValorValor {
  data: AtributoFuncionalVariedadValorValor[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AtributoFuncionalVariedadValorValorService {
  private apiUrl = environments.baseUrl+'api/atributoFuncionalVariedadValorValor'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postEnviarAtributos(idAtributoFuncionalVariedadValor:number,idAtributoTecnicoVariedadValors:number[]){
    return this.http.post<AtributoFuncionalVariedadValorValor>(`${this.apiUrl}/enviarAtributos`, {
      idAtributoFuncionalVariedadValor,
      idAtributoTecnicoVariedadValors
    });
  }

  add(model: AtributoFuncionalVariedadValorValor): Observable<AtributoFuncionalVariedadValorValor> {
    return this.http.post<AtributoFuncionalVariedadValorValor>(this.apiUrl, model);
  }

  update(id: number, model: AtributoFuncionalVariedadValorValor): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoFuncionalVariedadValorValor): Observable<AtributoFuncionalVariedadValorValor> {
    return this.http.delete<AtributoFuncionalVariedadValorValor>(`${this.apiUrl}/${model.id}`);
  }
}