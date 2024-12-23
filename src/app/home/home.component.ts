import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/services/alert.service';
import { MedicionService } from '../mantenimiento/service/medicion.service';
import { Medicion } from '../mantenimiento/interface/medicion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
}) 
export class HomeComponent implements OnInit{


  showModal=true;
  medicion='';
  mediciones:Medicion[] = [];

  constructor(
    private authService :AuthService,
    private medicionService : MedicionService,
    private alert : AlertService
  ){

  }

  ngOnInit(): void {
    this.medicionService.get().subscribe(x=>{
      this.mediciones = x.data;
    });
  }

  guardar() {
    if(this.medicion==''){
      this.alert.showAlert('Mensaje','Debe elegir una medición','warning');
      return;
    }
    localStorage.setItem('medicion',this.medicion);
    this.showModal = false;
  } 


}
