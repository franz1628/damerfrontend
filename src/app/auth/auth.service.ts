import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Usuario } from '../login/interfaces/usuario';
import { environments } from '../../environments/environments';
import { CargoService } from '../mantenimiento/service/cargo';

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

  logout(): void {
    localStorage.removeItem('usuario');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.getValue();
  }

  private checkLocalStorage(): boolean {
    const usuario = localStorage.getItem('usuario');
    return !!usuario; // Retorna true si existe el usuario, false si no.
  }

  getUsuario() {
    const raw = localStorage.getItem('usuario');
    return raw ? JSON.parse(raw) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRol(): string {
    const usuario = this.getUsuario();
    const cargoService = inject(CargoService);

    cargoService.get().subscribe((response) => {

    });

    if (!usuario) return 'Guest';

    switch (usuario.idCargo) {
      case 1:
        return 'Admin';
      case 2:
        return 'User';
      default:
        return 'Guest';
    }

    
  }

  isAdmin(): boolean {
    return this.getRol() === 'Admin';
  }

  canEdit(idVista:number): boolean {
    const usuario:Usuario = this.getUsuario();
    if (!usuario || !usuario.UsuarioVista) return false;
    return usuario.UsuarioVista.some(vista => vista.idVista === idVista && vista.idPermiso === 2);
  }

  canView(idVista:number): boolean {
    const usuario:Usuario = this.getUsuario().usuario;
    if (!usuario || !usuario.UsuarioVista) return false;

    return usuario.UsuarioVista.some(vista => vista.idVista === idVista && usuario.id == vista.idUsuario);
  }
}
