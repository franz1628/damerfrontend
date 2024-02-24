import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoTecnicoVariedad } from '../interface/atributoTecnicoVariedad';

@Injectable({
  providedIn: 'root'
})
export class AtributoTecnicoVariedadService {
  private apiUrl = environments.baseUrl+'api/atributoTecnicoVariedad'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
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

  delete(model: AtributoTecnicoVariedad): Observable<AtributoTecnicoVariedad> {
    return this.http.delete<AtributoTecnicoVariedad>(`${this.apiUrl}/${model.id}`);
  }
}