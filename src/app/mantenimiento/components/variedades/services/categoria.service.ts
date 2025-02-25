import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';

export interface ResponseCategoria {

  data: Categoria[],
  state: number,
  message: string
}

export interface ResponseOneCategoria {

  data: Categoria,
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environments.baseUrl+'api/categoria'; 

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseCategoria> {
    return this.http.get<ResponseCategoria>(this.apiUrl);
  }

 

  getIdCanastaMegaCategoria(idMegaCategoria: number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/canasta/megaCategoria`,{
      idMegaCategoria
    });
  }

  getIdCanastaMegaCategoriaAll(idMegaCategoria: number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/canasta/megaCategoriaAll`,{
      idMegaCategoria
    });
  }

  add(model: Categoria): Observable<ResponseOneCategoria> {
    return this.http.post<ResponseOneCategoria>(this.apiUrl, model);
  }

  postId(id: number): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/id`, {id});
  }

  postDescripcion(descripcion: string): Observable<Categoria[]> {
    return this.http.post<Categoria[]>(`${this.apiUrl}/descripcion`, {descripcion});
  }

  update(id: number, model: Categoria): Observable<ResponseOneCategoria> {
    return this.http.put<ResponseOneCategoria>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Categoria): Observable<ResponseOneCategoria> {
    return this.http.delete<ResponseOneCategoria>(`${this.apiUrl}/${model.id}`);
  }

  changeState(model: Categoria): Observable<ResponseOneCategoria> {
    return this.http.post<ResponseOneCategoria>(`${this.apiUrl}/changeState`, model);
  }

  getCategorias(idCategorias: string): Observable<ResponseCategoria> {
    return this.http.post<ResponseCategoria>(`${this.apiUrl}/getCategorias`, {idCategorias});
  }
}