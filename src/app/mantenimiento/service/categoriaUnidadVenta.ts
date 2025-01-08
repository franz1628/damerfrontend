import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { CategoriaUnidadVenta } from '../interface/categoriaUnidadVenta';

export interface ResponseCategoriaUnidadVenta {
  data: CategoriaUnidadVenta[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaUnidadVentaService {
  private apiUrl = environments.baseUrl+'api/categoriaUnidadVenta'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseCategoriaUnidadVenta> {
    return this.http.get<ResponseCategoriaUnidadVenta>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  getCodigo(codigo: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/codigo/${codigo}`);
  }

  getIdCliente(idCliente: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/idCliente/${idCliente}`);
  }

  postIdCategoria(idCategoria: number): Observable<ResponseCategoriaUnidadVenta> {
    return this.http.post<ResponseCategoriaUnidadVenta>(`${this.apiUrl}/idCategoria/`, {idCategoria});
  }

  add(model: CategoriaUnidadVenta): Observable<CategoriaUnidadVenta> {
    return this.http.post<CategoriaUnidadVenta>(this.apiUrl, model);
  }

  update(id: number, model: CategoriaUnidadVenta): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  suspender(model: CategoriaUnidadVenta): Observable<CategoriaUnidadVenta> {
    return this.http.post<CategoriaUnidadVenta>(`${this.apiUrl}/suspender`,{model});
  }

  delete(model: CategoriaUnidadVenta): Observable<CategoriaUnidadVenta> {
    return this.http.delete<CategoriaUnidadVenta>(`${this.apiUrl}/${model.id}`);
  }
}