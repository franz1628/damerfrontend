import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

type confirmFunction = ()=>void;

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  showAlert(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success'): void {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonText: 'OK'
    });
  }

  showAlertConfirm(title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success', confirm : ()=>void): void {
    Swal.fire({
      title,
      text: message,
      icon: type,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText:"Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        confirm()
      }
    });
  }
}
