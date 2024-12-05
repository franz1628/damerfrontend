import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteAgrupacionCategoria } from '../interface/clienteAgrupacionCategoria';
import { Categoria } from '../components/variedades/interfaces/categoria.interface';

export interface ResponseclienteAgrupacionCategoria {
  data: ClienteAgrupacionCategoria[],
  state: number,
  message: string
}
export interface ResponseclienteAgrupacionCategoriaOne {
  data: ClienteAgrupacionCategoria,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteAgrupacionCategoriaService {
  
  
  private apiUrl = environments.baseUrl+'api/clienteAgrupacionCategoria'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseclienteAgrupacionCategoria> {
    return this.http.get<ResponseclienteAgrupacionCategoria>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: ClienteAgrupacionCategoria): Observable<ClienteAgrupacionCategoria> {
    return this.http.post<ClienteAgrupacionCategoria>(this.apiUrl, model);
  }

  addCategoriasNuevo(idCliente:number, categoriasAgrupacion: Categoria[], nombreAgrupacionCategoria:string) {
    return this.http.post<ResponseclienteAgrupacionCategoriaOne>(`${this.apiUrl}/addCategoriasNuevo`, {idCliente,categoriasAgrupacion,nombreAgrupacionCategoria});
  }

  editCategorias(idClienteAgrupacionCategoria: number, categoriasAgrupacion: Categoria[],nombreAgrupacionCategoria:string) {
    return this.http.post<ResponseclienteAgrupacionCategoriaOne>(`${this.apiUrl}/editCategorias`, {
      categoriasAgrupacion,
      idClienteAgrupacionCategoria,
      nombreAgrupacionCategoria
    });
  }

  postIdCliente(idCliente: number): Observable<ResponseclienteAgrupacionCategoria> {
    return this.http.post<ResponseclienteAgrupacionCategoria>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  update(id: number, model: ClienteAgrupacionCategoria): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteAgrupacionCategoria): Observable<ClienteAgrupacionCategoria> {
    return this.http.delete<ClienteAgrupacionCategoria>(`${this.apiUrl}/${model.id}`);
  }
}