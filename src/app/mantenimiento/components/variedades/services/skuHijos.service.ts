import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError,of  } from 'rxjs';
import { environments } from '../../../../../environments/environments';
import { Response } from '../../../../shared/interfaces/response.interface';
import { SkuHijos } from '../interfaces/skuHijos.interface';
import { Sku } from '../interfaces/sku.interface';


export interface ResponseSkuHijos {

  data: SkuHijos[],
  state: number,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class SkuHijosService {

  
  private apiUrl = environments.baseUrl+'api/skuHijos'; 

  constructor(private http: HttpClient) {}

  get(): Observable<Response> {
    return this.http.get<Response>(this.apiUrl);
  }

  getId(id: number): Observable<SkuHijos|undefined> {
    return this.http.get<SkuHijos>(`${this.apiUrl}/${id}`).pipe(catchError(error=>of(undefined)));
  }



  postId(id: number): Observable<SkuHijos> {
    return this.http.post<SkuHijos>(`${this.apiUrl}/id`, {id});
  }

  postPack(sku: Sku,cantidad:number,nombrePack:string,skuPadre:Sku): Observable<ResponseSkuHijos> {
    return this.http.post<ResponseSkuHijos>(`${this.apiUrl}/postPack`, {sku,cantidad,nombrePack,skuPadre});
  }

  updatePack(sku: Sku,cantidad:number,nombrePack:string,skuPadre:Sku): Observable<ResponseSkuHijos> {
    return this.http.post<ResponseSkuHijos>(`${this.apiUrl}/updatePack`, {sku,cantidad,nombrePack,skuPadre});
  }


  postCombo(skus: Sku[],nombreCombo:string,porcentajes:string[],sku:Sku): Observable<ResponseSkuHijos> {
    return this.http.post<ResponseSkuHijos>(`${this.apiUrl}/postCombo`, {skus,nombreCombo,porcentajes,sku});
  }

  updateCombo(skus: Sku[],nombreCombo:string,porcentajes:string[],sku:Sku): Observable<ResponseSkuHijos> {
    return this.http.post<ResponseSkuHijos>(`${this.apiUrl}/updateCombo`, {skus,nombreCombo,porcentajes,sku});
  }
  
  add(model: SkuHijos): Observable<SkuHijos> {
    return this.http.post<SkuHijos>(this.apiUrl, model);
  }

  update(id: number, model: SkuHijos): Observable<SkuHijos> {
    return this.http.put<SkuHijos>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: SkuHijos): Observable<SkuHijos> {
    return this.http.delete<SkuHijos>(`${this.apiUrl}/${model.id}`);
  }
}