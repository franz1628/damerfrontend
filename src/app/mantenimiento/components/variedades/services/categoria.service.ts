import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environments.baseUrl+'api/categoria'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

 

  getIdCanastaMegaCategoria(idCanasta: number, idMegaCategoria: number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/canasta/megaCategoria`,{
      idCanasta,idMegaCategoria
    });
  }

  add(model: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, model);
  }

  postId(id: number): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}/id`, {id});
  }

  postDescripcion(descripcion: string): Observable<Categoria[]> {
    return this.http.post<Categoria[]>(`${this.apiUrl}/descripcion`, {descripcion});
  }

  update(id: number, model: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Categoria): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.apiUrl}/${model.id}`);
  }
}