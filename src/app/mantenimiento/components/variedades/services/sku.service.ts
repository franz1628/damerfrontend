import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { Sku } from '../interfaces/sku.interface';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private apiUrl = environments.baseUrl+'api/sku'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Sku|undefined> {
    return this.http.get<Sku>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  getByCategoria(idCategoria:number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/byCategoria`,{
      idCategoria
    });
  }

  postId(id: number): Observable<Sku> {
    return this.http.post<Sku>(`${this.apiUrl}/id`, {id});
  }

  postDescripcion(descripcion: string): Observable<Sku[]> {
    return this.http.post<Sku[]>(`${this.apiUrl}/descripcion`, {descripcion});
  }

  add(model: Sku): Observable<Sku> {
    return this.http.post<Sku>(this.apiUrl, model);
  }

  update(id: number, model: Sku): Observable<Sku> {
    return this.http.put<Sku>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Sku): Observable<Sku> {
    return this.http.delete<Sku>(`${this.apiUrl}/${model.id}`);
  }
}