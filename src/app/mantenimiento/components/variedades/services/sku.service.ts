import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { Sku } from '../interfaces/sku.interface';

export interface ResponseSku {

  data: Sku[],
  state: number,
  message: string
}

export interface ResponseSkuOne {

  data: Sku,
  state: number,
  message: string
}

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

  getByCategoriaAll(idClienteAgrupacionCategoria:number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/byCategoriaAll`,{
      idClienteAgrupacionCategoria
    });
  }


  postId(id: number): Observable<Sku> {
    return this.http.post<Sku>(`${this.apiUrl}/id`, {id});
  }

  postDescripcion(descripcion: string): Observable<Sku[]> {
    return this.http.post<Sku[]>(`${this.apiUrl}/descripcion`, {descripcion});
  }

  postDescripcionCategoria(descripcion: string,idCategoria:string): Observable<Sku[]> {
    return this.http.post<Sku[]>(`${this.apiUrl}/postDescripcionCategoria`, {descripcion,idCategoria});
  }

  add(model: Sku): Observable<ResponseSkuOne> {
    return this.http.post<ResponseSkuOne>(this.apiUrl, model);
  } 

  update(id: number, model: Sku): Observable<ResponseSkuOne> {
    return this.http.put<ResponseSkuOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Sku): Observable<Sku> {
    return this.http.delete<Sku>(`${this.apiUrl}/${model.id}`);
  }

  deleteImage(model: Sku): Observable<ResponseSkuOne> {
    return this.http.post<ResponseSkuOne>(`${this.apiUrl}/deleteImage`,model);
  }

  suspender(model: Sku): Observable<Sku> {
    return this.http.post<Sku>(`${this.apiUrl}/suspender`,{model});
  }
}