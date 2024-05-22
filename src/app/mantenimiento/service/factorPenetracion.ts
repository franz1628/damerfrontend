import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { FactorPenetracion } from '../interface/factorPenetracion';

export interface ResponseFactorPenetracion {
  data: FactorPenetracion[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class FactorPenetracionService {
  private apiUrl = environments.baseUrl+'api/factorPenetracion';

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseFactorPenetracion> {
    return this.http.get<ResponseFactorPenetracion>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: FactorPenetracion): Observable<FactorPenetracion> {
    return this.http.post<FactorPenetracion>(this.apiUrl, model);
  }

  update(id: number, model: FactorPenetracion): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: FactorPenetracion): Observable<FactorPenetracion> {
    return this.http.delete<FactorPenetracion>(`${this.apiUrl}/${model.id}`);
  }
}