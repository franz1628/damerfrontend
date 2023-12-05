import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { Provincia } from '../interface/provincia.interface';
import { environments } from '../../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private apiUrl = environments+'api/provincia'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Provincia|undefined> {
    return this.http.get<Provincia>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(this.apiUrl, model);
  }

  update(id: number, model: Provincia): Observable<Provincia> {
    return this.http.put<Provincia>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Provincia): Observable<Provincia> {
    return this.http.delete<Provincia>(`${this.apiUrl}/${model.id}`);
  }
}