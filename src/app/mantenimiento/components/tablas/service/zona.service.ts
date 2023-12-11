import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Zona } from '../interfaces/zona.interface';
import { environments } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  private apiUrl = environments.baseUrl+'/api/zona'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Zona|undefined> {
    return this.http.get<Zona>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Zona): Observable<Zona> {
    return this.http.post<Zona>(this.apiUrl, model);
  }

  update(id: number, model: Zona): Observable<Zona> {
    return this.http.put<Zona>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Zona): Observable<Zona> {
    return this.http.delete<Zona>(`${this.apiUrl}/${model.id}`);
  }
}