import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClasificadoReferencia } from '../interface/clasificadoReferencia';

export interface ResponseClasificadoReferencia {
  data: ClasificadoReferencia[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClasificadoReferenciaService {
  private apiUrl = environments.baseUrl+'api/clasificadoReferencia';

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseClasificadoReferencia> {
    return this.http.get<ResponseClasificadoReferencia>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postIdCliente(idCliente: number): Observable<ResponseClasificadoReferencia> {
    return this.http.post<ResponseClasificadoReferencia>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  add(model: ClasificadoReferencia): Observable<ClasificadoReferencia> {
    return this.http.post<ClasificadoReferencia>(this.apiUrl, model);
  }

  update(id: number, model: ClasificadoReferencia): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClasificadoReferencia): Observable<ClasificadoReferencia> {
    return this.http.delete<ClasificadoReferencia>(`${this.apiUrl}/${model.id}`);
  }
}