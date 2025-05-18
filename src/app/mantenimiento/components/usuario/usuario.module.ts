import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';



@NgModule({
   declarations: [
    UsuarioComponent
   ],
   imports: [
     CommonModule,
     FormsModule,
     SharedModule,
     ReactiveFormsModule,
     UsuarioRoutingModule
   ]
})
export class UsuarioModule { }
