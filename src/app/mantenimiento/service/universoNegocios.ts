import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { UniversoNegocios } from '../interface/universoNegocios';

export interface ResponseUniversoNegocios {
  data: UniversoNegocios[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class UniversoNegociosService {
  private apiUrl = environments.baseUrl+'api/universoNegocios';

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseUniversoNegocios> {
    return this.http.get<ResponseUniversoNegocios>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: UniversoNegocios): Observable<UniversoNegocios> {
    return this.http.post<UniversoNegocios>(this.apiUrl, model);
  }

  update(id: number, model: UniversoNegocios): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: UniversoNegocios): Observable<UniversoNegocios> {
    return this.http.delete<UniversoNegocios>(`${this.apiUrl}/${model.id}`);
  }
}