import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { Departamento } from '../interface/departamento.interface';
import { environments } from '../../../../../../environments/environments';

interface DepartamentoResponse {
  data: Departamento[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = environments.baseUrl+'api/departamento'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Departamento|undefined> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }

  add(model: Departamento): Observable<DepartamentoResponse> {
    return this.http.post<DepartamentoResponse>(this.apiUrl, model);
  }

  update(id: number, model: Departamento): Observable<DepartamentoResponse> {
    return this.http.put<DepartamentoResponse>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Departamento): Observable<Departamento> {
    return this.http.delete<Departamento>(`${this.apiUrl}/${model.id}`);
  }
}