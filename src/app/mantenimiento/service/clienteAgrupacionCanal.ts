import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteAgrupacionCanal } from '../interface/clienteAgrupacionCanal';
import { Canal } from '../components/tablas/interfaces/canal.interface';

export interface ResponseclienteAgrupacionCanal {
  data: ClienteAgrupacionCanal[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteAgrupacionCanalService {
  
  
  private apiUrl = environments.baseUrl+'api/clienteAgrupacionCanal'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseclienteAgrupacionCanal> {
    return this.http.get<ResponseclienteAgrupacionCanal>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  add(model: ClienteAgrupacionCanal): Observable<ClienteAgrupacionCanal> {
    return this.http.post<ClienteAgrupacionCanal>(this.apiUrl, model);
  }

  addCanalsNuevo(idCliente:number, canalsAgrupacion: Canal[], nombreAgrupacionCanal:string) {
    return this.http.post<ClienteAgrupacionCanal>(`${this.apiUrl}/addCanalsNuevo`, {idCliente,canalsAgrupacion,nombreAgrupacionCanal});
  }

  editCanals(idClienteAgrupacionCanal: number, canalsAgrupacion: Canal[],nombreAgrupacionCanal:string) {
    return this.http.post<ClienteAgrupacionCanal>(`${this.apiUrl}/editCanals`, {
      canalsAgrupacion,
      idClienteAgrupacionCanal,
      nombreAgrupacionCanal
    });
  }

  postIdCliente(idCliente: number): Observable<ResponseclienteAgrupacionCanal> {
    return this.http.post<ResponseclienteAgrupacionCanal>(`${this.apiUrl}/idCliente/`, {idCliente});
  }

  update(id: number, model: ClienteAgrupacionCanal): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteAgrupacionCanal): Observable<ClienteAgrupacionCanal> {
    return this.http.delete<ClienteAgrupacionCanal>(`${this.apiUrl}/${model.id}`);
  }
}