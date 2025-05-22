import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario, UsuarioInit } from '../../../login/interfaces/usuario';
import { Cargo } from '../../interface/cargo';
import { CargoService } from '../../service/cargo';
import { AlertService } from '../../../shared/services/alert.service';
import { VistaService } from '../../service/vista';
import { Vista } from '../../interface/vista';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit {
  model: Usuario = UsuarioInit;
  modelVistas: string[] = [];

  models: Usuario[] = [];
  cargos: Cargo[] = [];
  vistas: Vista[] = [];
  selectedCargo: number[] = [];
  selectedVista: number[] = [];

  usuario = this.fb.group({
    id: new FormControl<number>(0),
    email: new FormControl<string>('prueba@prueba.com'),
    password: new FormControl<string>('123456'),
    nombres: new FormControl<string>('Juan'),
    apellidoPaterno: new FormControl<string>('Pérez'),
    apellidoMaterno: new FormControl<string>('Gómez'),
    fechaRegistro: new FormControl<string>(''),
    fechaModificacion: new FormControl<string>(''),
    estado: new FormControl<number>(1),
    idCargo: new FormControl<number>(1),
    vistas: new FormControl<string>(''),
  });

  constructor(
    private fb: FormBuilder,
    private service: UsuarioService,
    private cargoService: CargoService,
    private vistaService: VistaService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadInit();
  }

  loadInit() {
    this.service.get().subscribe((x) => {
      this.models = x.data;

      this.models.forEach((model) => {
        this.selectedCargo.push(model.idCargo);
      });
    });

    this.cargoService.get().subscribe((x) => {
      this.cargos = x.data;
    });

    this.vistaService.get().subscribe((x) => {
      this.vistas = x.data;
    });
  }

  actualizar(index: number) {
    const model = this.models[index];
    this.service
      .updateCargo(model.id, this.selectedCargo[index])
      .subscribe((x) => {
        if (x.state == 1) {
          this.alert.showAlert('Mensaje', x.message, 'success');
          this.loadInit();
        } else {
          this.alert.showAlert('Mensaje', x.message, 'error');
        }
      });
  }

  changeCargo(e: Event, index: number) {
    const select = e.target as HTMLSelectElement;
    const selectedValue = select.value;
    this.selectedCargo[index] = parseInt(selectedValue);
  }

  cargarVistas(usuario: Usuario) {
    this.model = usuario;

    if (this.model.vistas != '' && this.model.vistas != null) {
      this.modelVistas = usuario.vistas.split(',');
    }

    this.selectedVista = [];
    this.vistas.forEach((vista) => {
      if (this.modelVistas.includes(vista.id.toString())) {
        this.selectedVista.push(vista.id);
      }
    });
  }

  toggleVista(id: number) {
    const index = this.selectedVista.indexOf(id);
    if (index === -1) {
      this.selectedVista.push(id);
    } else {
      this.selectedVista.splice(index, 1);
    }
  }

  guardarVistas() {
    const vistasString = this.selectedVista.join(',');
    this.service.updateVistas(this.model.id, vistasString).subscribe((x) => {
      if (x.state == 1) {
        this.alert.showAlert('Mensaje', x.message, 'success');
        this.loadInit();
      } else {
        this.alert.showAlert('Mensaje', x.message, 'error');
      }
    });
  }

  get getCurrent(){
    return this.usuario.getRawValue();
  }

  abrirModalAgregar() {
    this.usuario.patchValue(UsuarioInit);
  }

  abrirModalEditar(usuario: Usuario) {
    usuario.password = '';
    this.usuario.patchValue(usuario);
  }

  guardarUsuario() {
    const usuarioData = this.usuario.value as Usuario;
    console.log(usuarioData);
   
    
    if(usuarioData.id == 0) {
      this.service.add(usuarioData).subscribe((resp) => {
        if (resp.state == 1) {
          this.alert.showAlert('Mensaje', resp.message, 'success');
          this.usuario.patchValue(UsuarioInit);
          this.loadInit();
        } else {
          this.alert.showAlert('Mensaje', resp.message, 'error');
        }
      });
    }else{
      this.service.update(usuarioData.id,usuarioData).subscribe((resp) => {
        if (resp.state == 1) {
          this.alert.showAlert('Mensaje', resp.message, 'success');
          this.usuario.patchValue(UsuarioInit);
          this.loadInit();
        } else {
          this.alert.showAlert('Mensaje', resp.message, 'error');
        }
      });
    }

  }
}
