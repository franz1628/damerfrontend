import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Usuario } from '../login/interfaces/usuario';
import { environments } from '../../environments/environments';


export interface ResponseUsuario {
  data: Usuario,
  state: number,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environments.baseUrl+'api/usuario'; 

  private isAuthenticated = false;

  constructor(private router: Router,private http: HttpClient) { }



  // login(username: string, password: string): boolean {

  //   if (username === 'user' && password === 'password') {
  //     this.isAuthenticated = true;
  //     console.log('tehjs');
  //     this.router.navigate(['/']);
      
  //     return true;
  //   }
  //   return false;
  // }

  login(email: string, password: string): Observable<boolean> {

    return this.http.post<ResponseUsuario>(`${this.apiUrl}/login`, {email,password}).pipe(
      map(response => {
        if (response.state === 1) {
          this.isAuthenticated = true;

          const usuario:Usuario = response.data;
          localStorage.setItem("usuario", JSON.stringify(usuario));

          this.router.navigate(['/']); 
          return true;
        } else {
          return false;
        }
      })
    );

  }

  setLogin(){
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}