import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
}) 
export class HomeComponent implements OnInit{


  showModal=true;
  medicion='';

  constructor(
    private authService :AuthService,
    private alert : AlertService
  ){

  }

  ngOnInit(): void {
    //console.log(this.authService.isLoggedIn());
    if(localStorage.getItem('medicion')){
      this.showModal = false;
    }

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
