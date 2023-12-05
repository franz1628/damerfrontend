import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { Provincia } from '../interface/provincia.interface';
import { Distrito } from '../interface/distrito.interface';
import { environments } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private apiUrl = environments+'api/distrito'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Distrito|undefined> {
    return this.http.get<Distrito>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Distrito): Observable<Distrito> {
    return this.http.post<Distrito>(this.apiUrl, model);
  }

  update(id: number, model: Distrito): Observable<Distrito> {
    return this.http.put<Distrito>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Distrito): Observable<Distrito> {
    return this.http.delete<Distrito>(`${this.apiUrl}/${model.id}`);
  }
}