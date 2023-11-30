import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { Departamento } from '../interface/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/api/departamento'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Departamento|undefined> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, model);
  }

  update(id: number, model: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Departamento): Observable<Departamento> {
    return this.http.delete<Departamento>(`${this.apiUrl}/${model.id}`);
  }
}