import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent{
  username = '';
  password = '';
  errorMessage = '';

  myForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['',Validators.required]
  })

  authService = inject(AuthService);
  router = inject(Router);

  constructor(
    private fb: FormBuilder ,
    private alert:AlertService
    
    ) { 
      
    }


  login() {
    const valor = this.authService.login(this.myForm.get('username')?.value, this.myForm.get('password')?.value).subscribe(x=>{
      if(!x){
        this.alert.showAlert('Advertencia','Usuario o contraseña incorrectos','warning')
      }
    })
   
  }
}
