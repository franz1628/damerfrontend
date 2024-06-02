import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { Categoria } from '../interfaces/categoria.interface';
import { CategoriaAtributoTecnico } from '../interfaces/categoriaAtributoTecnico';

export interface ResponseCategoriaAtributoTecnico {

  data: CategoriaAtributoTecnico[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaAtributoTecnicoService {
  private apiUrl = environments.baseUrl+'api/categoriaAtributoTecnico'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<CategoriaAtributoTecnico|undefined> {
    return this.http.get<CategoriaAtributoTecnico>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }


  add(model: CategoriaAtributoTecnico): Observable<CategoriaAtributoTecnico> {
    return this.http.post<CategoriaAtributoTecnico>(this.apiUrl, model);
  }

  postIdCategoria(idCategoria: number): Observable<ResponseCategoriaAtributoTecnico> {
    return this.http.post<ResponseCategoriaAtributoTecnico>(`${this.apiUrl}/idCategoria`, {idCategoria});
  }

  postIdAgrupacionCategoria(idAgrupacionCategoria: number): Observable<ResponseCategoriaAtributoTecnico> {
    return this.http.post<ResponseCategoriaAtributoTecnico>(`${this.apiUrl}/idCategoria`, {idAgrupacionCategoria});
  }

  update(id: number, model: CategoriaAtributoTecnico): Observable<CategoriaAtributoTecnico> {
    return this.http.put<CategoriaAtributoTecnico>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: CategoriaAtributoTecnico): Observable<CategoriaAtributoTecnico> {
    return this.http.delete<CategoriaAtributoTecnico>(`${this.apiUrl}/${model.id}`);
  }
}