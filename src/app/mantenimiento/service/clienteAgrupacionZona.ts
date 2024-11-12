import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteAgrupacionZona } from '../interface/clienteAgrupacionZona';
import { Zona } from '../components/tablas/interfaces/zona.interface';

export interface ResponseclienteAgrupacionZona {
  data: ClienteAgrupacionZona[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteAgrupacionZonaService {
  
  
  private apiUrl = environments.baseUrl+'api/clienteAgrupacionZona'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseclienteAgrupacionZona> {
    return this.http.get<ResponseclienteAgrupacionZona>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: ClienteAgrupacionZona): Observable<ClienteAgrupacionZona> {
    return this.http.post<ClienteAgrupacionZona>(this.apiUrl, model);
  }

  addZonasNuevo(idCliente:number, zonasAgrupacion: Zona[], nombreAgrupacionZona:string) {
    return this.http.post<ClienteAgrupacionZona>(`${this.apiUrl}/addZonasNuevo`, {idCliente,zonasAgrupacion,nombreAgrupacionZona});
  }

  editZonas(idClienteAgrupacionZona: number, zonasAgrupacion: Zona[],nombreAgrupacionZona:string) {
    return this.http.post<ClienteAgrupacionZona>(`${this.apiUrl}/editZonas`, {
      zonasAgrupacion,
      idClienteAgrupacionZona,
      nombreAgrupacionZona
    });
  }

  postIdCliente(idCliente: number): Observable<ResponseclienteAgrupacionZona> {
    return this.http.post<ResponseclienteAgrupacionZona>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  update(id: number, model: ClienteAgrupacionZona): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteAgrupacionZona): Observable<ClienteAgrupacionZona> {
    return this.http.delete<ClienteAgrupacionZona>(`${this.apiUrl}/${model.id}`);
  }
}