import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { AtributoTecnicoVariedad } from '../interface/atributoTecnicoVariedad';
import { AtributoTecnicoVariedadValor } from '../interface/atributoTecnicoVariedadValor';
import { CategoriaAtributoTecnico } from '../components/variedades/interfaces/categoriaAtributoTecnico';

export interface ResponseAtributoTecnicoVariedadValor {

  data: AtributoTecnicoVariedadValor[],
  state: number,
  message: string
}

export interface ResponseOneAtributoTecnicoVariedadValor {

  data: AtributoTecnicoVariedadValor,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AtributoTecnicoVariedadValorService {
  private apiUrl = environments.baseUrl+'api/atributoTecnicoVariedadValor'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }



  postIdAtributoTecnicoVariedad(idAtributoTecnicoVariedad: number): Observable<AtributoTecnicoVariedadValor[]> {
    return this.http.post<AtributoTecnicoVariedadValor[]>(`${this.apiUrl}/idAtributoTecnicoVariedad`, {idAtributoTecnicoVariedad});
  }

  add(model: AtributoTecnicoVariedadValor): Observable<AtributoTecnicoVariedadValor> {
    return this.http.post<AtributoTecnicoVariedadValor>(this.apiUrl, model);
  }

  update(id: number, model: AtributoTecnicoVariedadValor): Observable<AtributoTecnicoVariedadValor> {
    return this.http.put<AtributoTecnicoVariedadValor>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: AtributoTecnicoVariedadValor): Observable<ResponseOneAtributoTecnicoVariedadValor> {
    return this.http.delete<ResponseOneAtributoTecnicoVariedadValor>(`${this.apiUrl}/${model.id}`);
  }
}