import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Permiso } from '../interface/permiso';

export interface ResponsePermisoOne {
  data: Permiso,
  state: number,
  message: string
}
export interface ResponsePermiso {
  data: Permiso[],
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = environments.baseUrl+'api/permiso'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponsePermiso> {
    return this.http.get<ResponsePermiso>(this.apiUrl);
  }

  getId(id: number): Observable<ResponsePermisoOne> {
    return this.http.get<ResponsePermisoOne>(`${this.apiUrl}/${id}`);
  }


  add(model: Permiso): Observable<ResponsePermisoOne> {
    return this.http.post<ResponsePermisoOne>(this.apiUrl, model);
  }

  update(id: number, model: Permiso): Observable<ResponsePermisoOne> {
    return this.http.put<ResponsePermisoOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Permiso): Observable<Permiso> {
    return this.http.delete<Permiso>(`${this.apiUrl}/${model.id}`);
  }
}