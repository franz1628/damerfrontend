import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { TipoZona } from '../interface/tipoZona';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TipoZonaService {
  private apiUrl = environments.baseUrl+'api/tipoZona'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: TipoZona): Observable<TipoZona> {
    return this.http.post<TipoZona>(this.apiUrl, model);
  }

  update(id: number, model: TipoZona): Observable<TipoZona> {
    return this.http.put<TipoZona>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: TipoZona): Observable<TipoZona> {
    return this.http.delete<TipoZona>(`${this.apiUrl}/${model.id}`);
  }
}