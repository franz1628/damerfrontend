import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { Parametro } from '../interface/parametro.interface';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private apiUrl = 'http://localhost:8080/api/parametro'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: Parametro): Observable<Parametro> {
    return this.http.post<Parametro>(this.apiUrl, model);
  }

  update(id: number, model: Parametro): Observable<Parametro> {
    return this.http.put<Parametro>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Parametro): Observable<Parametro> {
    return this.http.delete<Parametro>(`${this.apiUrl}/${model.id}`);
  }
}