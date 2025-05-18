import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Response } from '../../shared/interfaces/response.interface';
import { environments } from '../../../environments/environments';
import { Cargo } from '../interface/cargo';

export interface ResponseCargoOne {
  data: Cargo,
  state: number,
  message: string
}
export interface ResponseCargo {
  data: Cargo[],
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private apiUrl = environments.baseUrl+'api/cargo'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) {}

  get(): Observable<ResponseCargo> {
    return this.http.get<ResponseCargo>(this.apiUrl);
  }

  getId(id: number): Observable<ResponseCargoOne> {
    return this.http.get<ResponseCargoOne>(`${this.apiUrl}/${id}`);
  }


  add(model: Cargo): Observable<ResponseCargoOne> {
    return this.http.post<ResponseCargoOne>(this.apiUrl, model);
  }

  update(id: number, model: Cargo): Observable<ResponseCargoOne> {
    return this.http.put<ResponseCargoOne>(`${this.apiUrl}/${id}`, model);
  }

  delete(model: Cargo): Observable<Cargo> {
    return this.http.delete<Cargo>(`${this.apiUrl}/${model.id}`);
  }
}