import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { ClienteFiltro } from '../interface/clienteFiltro';

export interface ResponseClienteFiltro {
  data: ClienteFiltro[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ClienteFiltroService {
  private apiUrl = environments.baseUrl+'api/clienteFiltro'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }


  add(model: ClienteFiltro): Observable<ClienteFiltro> {
    return this.http.post<ClienteFiltro>(this.apiUrl, model);
  }

  postIdAtributoFuncionalVariedadValor(idAtributoFuncionalVariedadValor: number): Observable<ResponseClienteFiltro> {
    return this.http.post<ResponseClienteFiltro>(`${this.apiUrl}/idAtributoFuncionalVariedadValor`, {idAtributoFuncionalVariedadValor});
  }

  update(id: number, model: ClienteFiltro): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: ClienteFiltro): Observable<ClienteFiltro> {
    return this.http.delete<ClienteFiltro>(`${this.apiUrl}/${model.id}`);
  }
}