import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getRol();

    if (userRole === expectedRole) {
      return true;
    }

    router.navigate(['/no-autorizado']);
    return false;
  };
};