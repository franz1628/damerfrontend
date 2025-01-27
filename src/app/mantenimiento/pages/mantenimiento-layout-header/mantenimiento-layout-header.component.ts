import { Component } from '@angular/core';
import { Usuario, UsuarioInit } from '../../../login/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mantenimiento-layout-header',
  templateUrl: './mantenimiento-layout-header.component.html',
})
export class MantenimientoLayoutHeaderComponent {
  usuario: Usuario = UsuarioInit;
  medicion:string = localStorage.getItem('valormedicion') || '';

  constructor(private router: Router) {
    const usuarioData = localStorage.getItem('usuario');
    this.usuario = usuarioData ? JSON.parse(usuarioData) : UsuarioInit;
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
