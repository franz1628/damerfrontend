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

  getByCategoria(idCanasta: number, idMegaCategoria: number,idCategoria:number): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/byCategoria`,{
      idCanasta,idMegaCategoria,idCategoria
    });
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