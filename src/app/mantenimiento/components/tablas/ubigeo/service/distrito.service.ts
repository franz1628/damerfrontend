import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of,throwError  } from 'rxjs';
import { Response } from '../../../../../shared/interfaces/response.interface';
import { Provincia } from '../interface/provincia.interface';
import { Distrito } from '../interface/distrito.interface';
import { environments } from '../../../../../../environments/environments';
import { Zona } from '../../interfaces/zona.interface';

export interface ResponseDistritoOne {
  data: Distrito,
  state: number,
  message: string
}

export interface ResponseDistrito {
  data: Distrito[],
  state: number,
  message: string
}



@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private apiUrl = environments.baseUrl+'api/distrito'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseDistritoOne> {
    return this.http.get<ResponseDistritoOne>(`${this.apiUrl}/${id}`);
  }

  add(model: Distrito): Observable<ResponseDistrito> {
    return this.http.post<ResponseDistrito>(this.apiUrl, model);
  }

  postByZona(zona: Zona): Observable<ResponseDistrito> {
    return this.http.post<ResponseDistrito>(`${this.apiUrl}/postByZona`, {zona});
  }

  update(id: number, model: Distrito): Observable<ResponseDistrito> {
    return this.http.put<ResponseDistrito>(`${this.apiUrl}/${id}`, model);
  }

  postQuitarZona(id: number, model: Distrito,idZona:number): Observable<ResponseDistrito> {
    return this.http.put<ResponseDistrito>(`${this.apiUrl}/postQuitarZona/${id}`, {model,idZona});
  }

  delete(model: Distrito): Observable<Distrito> {
    return this.http.delete<Distrito>(`${this.apiUrl}/${model.id}`);
  }
}