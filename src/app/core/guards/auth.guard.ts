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
  // Evitar redirección infinita si ya estás en la página de login
  const isLoginPage = segments.some((segment) => segment.path === 'login');
  const isRegisterPage = segments.some(
    (segment) => segment.path === 'register'
  );
  return loginService.authToken$.pipe(
    map((token) => {
      console.log('token... ', token);

      if (isLoginPage) {
        loginService.removeToken();
        return false; // Bloquea el acceso a la página protegida desde 'login'
      }
      if (isRegisterPage) {
        loginService.removeToken();
        return false;
      }
      // Si hay un token, se permite el acceso
      if (token) {
        return true;
      }

      // Redirigir al login si no hay token
      console.log('### Redirigiendo al login ###');
      return router.createUrlTree(['login']);
    })
  );
};
