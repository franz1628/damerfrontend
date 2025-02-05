import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { Negocio } from '../interface/negocio.interface';
import { environments } from '../../../environments/environments';
import { Medicion } from '../interface/medicion';

interface ResponseMedicion  {
  data: Medicion[];
  message: string;
  status: number; 
}

interface ResponseNextMedicion  {
  data: Medicion;
  message: string;
  status: number; 
}


@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  private apiUrl = environments.baseUrl+'api/medicion'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseMedicion> {
    return this.http.get<ResponseMedicion>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  add(model: Medicion): Observable<Medicion> {
    return this.http.post<Medicion>(this.apiUrl, model);
  }

  nextMedicion(): Observable<ResponseNextMedicion> {
    return this.http.get<ResponseNextMedicion>(`${this.apiUrl}/nextMedicion`);
  }

  update(id: number, model: Medicion): Observable<Medicion> {
    return this.http.put<Medicion>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Medicion): Observable<Medicion> {
    return this.http.delete<Medicion>(`${this.apiUrl}/${model.id}`);
  }
}