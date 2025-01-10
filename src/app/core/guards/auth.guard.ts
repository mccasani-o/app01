import { inject } from '@angular/core';
import { CanMatchFn, GuardResult, MaybeAsync, Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { map } from 'rxjs';

export const AuthGuard: CanMatchFn = (
  route,
  segments
): MaybeAsync<GuardResult> => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.authToken$.pipe(
   
    map((token) => {
      // Si hay un token, se permite el acceso
      if (token) {
        return true;
      }

      // Evitar redirección infinita si ya estás en la página de login
      const isLoginPage = segments.some((segment) => segment.path === 'login');
      if (isLoginPage) {
        return false; // Bloquea el acceso a la página protegida desde 'login'
      }

      // Redirigir al login si no hay token
      console.log('### Redirigiendo al login ###');
      return router.createUrlTree(['login']);
    })
  );
};
