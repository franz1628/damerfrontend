import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteFormula } from '../interface/clienteFormula';

export interface ResponseClienteFormula {
  data: ClienteFormula[],
  state: number,
  message: string
}

export interface ResponseClienteFormulaOne {
  data: ClienteFormula,
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteFormulaService {
  private apiUrl = environments.baseUrl+'api/clienteFormula'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: ClienteFormula): Observable<ClienteFormula> {
    return this.http.post<ClienteFormula>(this.apiUrl, model);
  }

  asignarFormula(model: ClienteFormula): Observable<ResponseClienteFormula> {
    return this.http.post<ResponseClienteFormula>(`${this.apiUrl}/asignarFormula`, model);
  }

  postIdAtributoFuncionalVariedadValor(idAtributoFuncionalVariedadValor: number): Observable<ResponseClienteFormulaOne> {
    return this.http.post<ResponseClienteFormulaOne>(`${this.apiUrl}/idAtributoFuncionalVariedadValor`, {idAtributoFuncionalVariedadValor});
  }


  postCargaResultados(idAtributoFuncionalVariedadValor: number): Observable<ResponseClienteFormula> {
    return this.http.post<ResponseClienteFormula>(`${this.apiUrl}/cargaResultados`, {idAtributoFuncionalVariedadValor});
  }

  update(id: number, model: ClienteFormula): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteFormula): Observable<ClienteFormula> {
    return this.http.delete<ClienteFormula>(`${this.apiUrl}/${model.id}`);
  }
}