import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { MegaCategoria } from '../interfaces/megaCategoria.interface';

@Injectable({
  providedIn: 'root'
})
export class MegaCategoriaService {
  private apiUrl = environments.baseUrl+'api/megaCategoria'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<MegaCategoria|undefined> {
    return this.http.get<MegaCategoria>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  getCodigoCanasta(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/canasta/${codigo}`);
  }

  add(model: MegaCategoria): Observable<MegaCategoria> {
    return this.http.post<MegaCategoria>(this.apiUrl, model);
  }

  postCodigo(codigo: number): Observable<MegaCategoria> {
    return this.http.post<MegaCategoria>(`${this.apiUrl}/codigo`, {codigo});
  }

  update(id: number, model: MegaCategoria): Observable<MegaCategoria> {
    return this.http.put<MegaCategoria>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: MegaCategoria): Observable<MegaCategoria> {
    return this.http.delete<MegaCategoria>(`${this.apiUrl}/${model.id}`);
  }
}