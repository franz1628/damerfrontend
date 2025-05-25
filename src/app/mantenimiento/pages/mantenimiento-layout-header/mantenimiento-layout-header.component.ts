import { Component } from '@angular/core';
import { Usuario, UsuarioInit } from '../../../login/interfaces/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { VistaService } from '../../service/vista';
import { Vista } from '../../interface/vista';

@Component({
  selector: 'app-mantenimiento-layout-header',
  templateUrl: './mantenimiento-layout-header.component.html',
})
export class MantenimientoLayoutHeaderComponent {
  usuario: Usuario = UsuarioInit;
  medicion:string = localStorage.getItem('valormedicion') || '';
  vistas : Vista[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private vistaService: VistaService
  ) {
    const usuarioData = localStorage.getItem('usuario');
    this.usuario = usuarioData ? JSON.parse(usuarioData) : UsuarioInit;
    this.vistaService.get().subscribe((x) => {
      this.vistas = x.data;
    });
  }
 
  canView(idVista:number): boolean {
    return this.authService.canView(idVista);
  }

  logout(): void {
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('usuario');
    localStorage.removeItem('medicion');
    localStorage.removeItem('valormedicion');

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
