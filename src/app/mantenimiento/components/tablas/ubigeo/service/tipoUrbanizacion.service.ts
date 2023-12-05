import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { TipoUrbanizacion } from '../interface/tipoUrbzanizacion.interface';
import { environments } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TipoUrbanizacionService {
  private apiUrl = environments+'/api/tipoUrbanizacion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<TipoUrbanizacion|undefined> {
    return this.http.get<TipoUrbanizacion>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: TipoUrbanizacion): Observable<TipoUrbanizacion> {
    return this.http.post<TipoUrbanizacion>(this.apiUrl, model);
  }

  update(id: number, model: TipoUrbanizacion): Observable<TipoUrbanizacion> {
    return this.http.put<TipoUrbanizacion>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoUrbanizacion): Observable<TipoUrbanizacion> {
    return this.http.delete<TipoUrbanizacion>(`${this.apiUrl}/${model.id}`);
  }
}