import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Pais } from '../interface/pais.interface';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { environments } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private apiUrl = environments+'api/pais'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Pais|undefined> {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.apiUrl, model);
  }

  update(id: number, model: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Pais): Observable<Pais> {
    return this.http.delete<Pais>(`${this.apiUrl}/${model.id}`);
  }
}