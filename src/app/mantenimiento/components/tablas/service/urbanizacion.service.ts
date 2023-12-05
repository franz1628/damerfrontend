import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Urbanizacion } from '../interfaces/urbanizacion.interface';
import { environments } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UrbanizacionService {
  private apiUrl = environments+'api/urbanizacion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Urbanizacion|undefined> {
    return this.http.get<Urbanizacion>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Urbanizacion): Observable<Urbanizacion> {
    return this.http.post<Urbanizacion>(this.apiUrl, model);
  }

  update(id: number, model: Urbanizacion): Observable<Urbanizacion> {
    return this.http.put<Urbanizacion>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Urbanizacion): Observable<Urbanizacion> {
    return this.http.delete<Urbanizacion>(`${this.apiUrl}/${model.id}`);
  }
}