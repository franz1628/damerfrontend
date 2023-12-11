import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Canasta } from '../interfaces/canasta.interface';
import { Response } from '../../../../shared/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CanastaService {
  private apiUrl = environments.baseUrl+'api/canasta'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Canasta|undefined> {
    return this.http.get<Canasta>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  getCodigo(codCanasta: number): Observable<Canasta|undefined> {
    return this.http.get<Canasta>(`${this.apiUrl}/canasta/${codCanasta}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Canasta): Observable<Canasta> {
    return this.http.post<Canasta>(this.apiUrl, model);
  }

  update(id: number, model: Canasta): Observable<Canasta> {
    return this.http.put<Canasta>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Canasta): Observable<Canasta> {
    return this.http.delete<Canasta>(`${this.apiUrl}/${model.id}`);
  }
}