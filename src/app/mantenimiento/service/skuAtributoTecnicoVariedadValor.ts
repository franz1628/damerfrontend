import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { SkuAtributoTecnicoVariedadValor } from '../interface/skuAtributoTecnicoVariedadValor';

export interface ResponseSkuAtributoTecnicoVariedadValor {
  data: SkuAtributoTecnicoVariedadValor[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SkuAtributoTecnicoVariedadValorService {
  private apiUrl = environments.baseUrl+'api/skuAtributoTecnicoVariedadValor'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  postIdSku(idSku: number): Observable<ResponseSkuAtributoTecnicoVariedadValor> {
    return this.http.post<ResponseSkuAtributoTecnicoVariedadValor>(`${this.apiUrl}/idSku`, {idSku});
  }


  postResultados(idAtributoTecnicoVariedadValors: string): Observable<ResponseSkuAtributoTecnicoVariedadValor> {
    return this.http.post<ResponseSkuAtributoTecnicoVariedadValor>(`${this.apiUrl}/postResultados`, {idAtributoTecnicoVariedadValors});
  }

  add(model: SkuAtributoTecnicoVariedadValor): Observable<SkuAtributoTecnicoVariedadValor> {
    return this.http.post<SkuAtributoTecnicoVariedadValor>(this.apiUrl, model);
  }

  update(id: number, model: SkuAtributoTecnicoVariedadValor): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: SkuAtributoTecnicoVariedadValor): Observable<SkuAtributoTecnicoVariedadValor> {
    return this.http.delete<SkuAtributoTecnicoVariedadValor>(`${this.apiUrl}/${model.id}`);
  }
}