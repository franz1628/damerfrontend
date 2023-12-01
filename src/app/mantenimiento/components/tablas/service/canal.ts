import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Canal } from '../interfaces/canal.interface';

@Injectable({
  providedIn: 'root'
})
export class CanalService {
  private apiUrl = 'http://localhost:8080/api/canal'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Canal|undefined> {
    return this.http.get<Canal>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Canal): Observable<Canal> {
    return this.http.post<Canal>(this.apiUrl, model);
  }

  update(id: number, model: Canal): Observable<Canal> {
    return this.http.put<Canal>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Canal): Observable<Canal> {
    return this.http.delete<Canal>(`${this.apiUrl}/${model.id}`);
  }
}