import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoTecnicoNegocio } from '../interface/atributoTecnicoNegocio';

@Injectable({
  providedIn: 'root'
})
export class AtributoTecnicoNegocioService {
  private apiUrl = environments.baseUrl+'api/atributoTecnicoNegocio'; // Reemplaza con la URL de tu backend

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

  add(model: AtributoTecnicoNegocio): Observable<AtributoTecnicoNegocio> {
    return this.http.post<AtributoTecnicoNegocio>(this.apiUrl, model);
  }

  update(id: number, model: AtributoTecnicoNegocio): Observable<AtributoTecnicoNegocio> {
    return this.http.put<AtributoTecnicoNegocio>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoTecnicoNegocio): Observable<AtributoTecnicoNegocio> {
    return this.http.delete<AtributoTecnicoNegocio>(`${this.apiUrl}/${model.id}`);
  }
}