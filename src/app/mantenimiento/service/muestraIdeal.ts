import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { MuestraIdeal } from '../interface/muestraIdeal';

export interface ResponseMuestraIdeal {
  data: MuestraIdeal[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class MuestraIdealService {
  private apiUrl = environments.baseUrl+'api/muestraIdeal';

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseMuestraIdeal> {
    return this.http.get<ResponseMuestraIdeal>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: MuestraIdeal): Observable<MuestraIdeal> {
    return this.http.post<MuestraIdeal>(this.apiUrl, model);
  }

  update(id: number, model: MuestraIdeal): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: MuestraIdeal): Observable<MuestraIdeal> {
    return this.http.delete<MuestraIdeal>(`${this.apiUrl}/${model.id}`);
  }
}