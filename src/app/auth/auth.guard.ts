import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado
  if (authService.isLoggedIn()) {
    return true;
  }

  // Redirige al login si no está autenticado
  return router.parseUrl('/login');
};
