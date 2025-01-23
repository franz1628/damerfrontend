import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from '../login/interfaces/usuario';
import { environments } from '../../environments/environments';

export interface ResponseUsuario {
  data: Usuario;
  state: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environments.baseUrl}api/usuario`;
  
  // BehaviorSubject para manejar el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkLocalStorage());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  /**
   * Inicia sesión con email y contraseña
   */
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<ResponseUsuario>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map((response) => {
          if (response.state === 1) {
            const usuario: Usuario = response.data;

            // Guardar el usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(usuario));

            // Actualizar el estado de autenticación
            this.isAuthenticatedSubject.next(true);

            // Navegar al home
            this.router.navigate(['/']);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  /**
   * Cierra sesión y elimina los datos del usuario
   */
  logout(): void {
    // Eliminar usuario de localStorage
    localStorage.removeItem('usuario');

    // Actualizar el estado de autenticación
    this.isAuthenticatedSubject.next(false);

    // Navegar al login
    this.router.navigate(['/login']);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  /**
   * Método privado para verificar el almacenamiento local al cargar la aplicación
   */
  private checkLocalStorage(): boolean {
    const usuario = localStorage.getItem('usuario');
    return !!usuario; // Retorna true si existe el usuario, false si no.
  }
}
