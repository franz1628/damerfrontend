import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoTecnicoVariedad } from '../interface/atributoTecnicoVariedad';


export interface ResponseAtributoTecnicoVariedad {
  data: AtributoTecnicoVariedad[],
  state: number,
  message: string
}

export interface ResponseOneAtributoTecnicoVariedad {
  data: AtributoTecnicoVariedad,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AtributoTecnicoVariedadService {
  private apiUrl = environments.baseUrl+'api/atributoTecnicoVariedad'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseAtributoTecnicoVariedad> {
    return this.http.get<ResponseAtributoTecnicoVariedad>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: AtributoTecnicoVariedad): Observable<AtributoTecnicoVariedad> {
    return this.http.post<AtributoTecnicoVariedad>(this.apiUrl, model);
  }

  update(id: number, model: AtributoTecnicoVariedad): Observable<AtributoTecnicoVariedad> {
    return this.http.put<AtributoTecnicoVariedad>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoTecnicoVariedad): Observable<ResponseOneAtributoTecnicoVariedad> {
    return this.http.delete<ResponseOneAtributoTecnicoVariedad>(`${this.apiUrl}/${model.id}`);
  }
}