import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Variable } from '../interface/variable';

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  private apiUrl = environments.baseUrl+'api/Variable'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: Variable): Observable<Variable> {
    return this.http.post<Variable>(this.apiUrl, model);
  }

  update(id: number, model: Variable): Observable<Variable> {
    return this.http.put<Variable>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Variable): Observable<Variable> {
    return this.http.delete<Variable>(`${this.apiUrl}/${model.id}`);
  }
}