import { Component } from '@angular/core';
import { Usuario, UsuarioInit } from '../../../login/interfaces/usuario';

@Component({
  selector: 'app-mantenimiento-layout-header',
  templateUrl: './mantenimiento-layout-header.component.html'
})
export class MantenimientoLayoutHeaderComponent {
  usuario :Usuario = UsuarioInit
  
  constructor () {
    this.usuario = JSON.parse(localStorage.getItem('usuario')||'')
  }
}
