import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoFuncionalVariedad } from '../interface/atributoFuncionalVariedad';

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

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  getCodClienteCodCategoria(codCliente: number, codCategoria:number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codCliente/${codCliente}/${codCategoria}`);
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