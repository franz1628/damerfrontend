import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Via } from '../interface/via';

export interface ResponseVia {
  data: Via[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ViaService {
  private apiUrl = environments.baseUrl+'api/via'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseVia> {
    return this.http.get<ResponseVia>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: Via): Observable<Via> {
    return this.http.post<Via>(this.apiUrl, model);
  }

  update(id: number, model: Via): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Via): Observable<Via> {
    return this.http.delete<Via>(`${this.apiUrl}/${model.id}`);
  }
}