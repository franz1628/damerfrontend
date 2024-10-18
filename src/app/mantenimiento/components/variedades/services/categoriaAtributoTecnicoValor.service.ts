import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { CategoriaAtributoTecnicoValor } from '../interfaces/categoriaAtributoTecnicoValor';

export interface ResponseCategoriaAtributoTecnicoValor {

  data: CategoriaAtributoTecnicoValor[],
  state: number,
  message: string
}

export interface ResponseOneCategoriaAtributoTecnicoValor {

  data: CategoriaAtributoTecnicoValor,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaAtributoTecnicoValorService {
  private apiUrl = environments.baseUrl+'api/categoriaAtributoTecnicoValor'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<CategoriaAtributoTecnicoValor|undefined> {
    return this.http.get<CategoriaAtributoTecnicoValor>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }


  add(model: CategoriaAtributoTecnicoValor): Observable<CategoriaAtributoTecnicoValor> {
    return this.http.post<CategoriaAtributoTecnicoValor>(this.apiUrl, model);
  }

  postIdCategoria(idCategoria: number): Observable<CategoriaAtributoTecnicoValor[]> {
    return this.http.post<CategoriaAtributoTecnicoValor[]>(`${this.apiUrl}/idCategoria`, {idCategoria});
  }

  postIdCategoriaAtributoTecnico(idCategoriaAtributoTecnico: number): Observable<CategoriaAtributoTecnicoValor[]> {
    return this.http.post<CategoriaAtributoTecnicoValor[]>(`${this.apiUrl}/idCategoriaAtributoTecnico`, {idCategoriaAtributoTecnico});
  }

  update(id: number, model: CategoriaAtributoTecnicoValor): Observable<CategoriaAtributoTecnicoValor> {
    return this.http.put<CategoriaAtributoTecnicoValor>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: CategoriaAtributoTecnicoValor): Observable<ResponseOneCategoriaAtributoTecnicoValor> {
    return this.http.delete<ResponseOneCategoriaAtributoTecnicoValor>(`${this.apiUrl}/${model.id}`);
  }
}