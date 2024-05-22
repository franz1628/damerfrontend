import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionCategoriaCategoria } from '../interface/agrupacionCategoriaCategoria';

export interface ResponseAgrupacionCategoriaCategoria {
  data: AgrupacionCategoriaCategoria[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionCategoriaCategoriaService {
  private apiUrl = environments.baseUrl+'api/agrupacionCategoriaCategoria'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionCategoriaCategoria> {
    return this.http.get<ResponseAgrupacionCategoriaCategoria>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AgrupacionCategoriaCategoria): Observable<AgrupacionCategoriaCategoria> {
    return this.http.post<AgrupacionCategoriaCategoria>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionCategoriaCategoria): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionCategoriaCategoria): Observable<AgrupacionCategoriaCategoria> {
    return this.http.delete<AgrupacionCategoriaCategoria>(`${this.apiUrl}/${model.id}`);
  }
}