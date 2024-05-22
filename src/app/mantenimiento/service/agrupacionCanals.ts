import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AgrupacionCanals } from '../interface/agrupacionCanals';

export interface ResponseAgrupacionCanals {
  data: AgrupacionCanals[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AgrupacionCanalsService {
  private apiUrl = environments.baseUrl+'api/agrupacionCanals'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAgrupacionCanals> {
    return this.http.get<ResponseAgrupacionCanals>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AgrupacionCanals): Observable<AgrupacionCanals> {
    return this.http.post<AgrupacionCanals>(this.apiUrl, model);
  }

  update(id: number, model: AgrupacionCanals): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AgrupacionCanals): Observable<AgrupacionCanals> {
    return this.http.delete<AgrupacionCanals>(`${this.apiUrl}/${model.id}`);
  }
}