import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const roleGuard = (idVista: number): CanActivateFn => {

  //poner la funcion de canEdit y canView en el servicio de auth


  return () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getRol();

    if(authService.canView(idVista) || authService.canEdit(idVista)) {
      return true;
    }
    
    router.navigate(['/no-autorizado']);
    return false;
  };
};