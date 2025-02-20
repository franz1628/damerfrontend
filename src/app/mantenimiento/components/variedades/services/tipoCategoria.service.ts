import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { TipoCategoria } from '../interfaces/tipoCategoria.interface';

@Injectable({
  providedIn: 'root'
})
export class TipoCategoriaService {
  private apiUrl = environments.baseUrl+'api/tipoCategoria'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<TipoCategoria|undefined> {
    return this.http.get<TipoCategoria>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  getIdCanasta(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/canasta/${id}`);
  }

  add(model: TipoCategoria): Observable<TipoCategoria> {
    return this.http.post<TipoCategoria>(this.apiUrl, model);
  }

  postId(id: number): Observable<TipoCategoria> {
    return this.http.post<TipoCategoria>(`${this.apiUrl}/id`, {id});
  }

  update(id: number, model: TipoCategoria): Observable<TipoCategoria> {
    return this.http.put<TipoCategoria>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoCategoria): Observable<TipoCategoria> {
    return this.http.delete<TipoCategoria>(`${this.apiUrl}/${model.id}`);
  }
}