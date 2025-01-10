import { CanActivateFn } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const HasRolGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const rolesRequired = route.data?.['roles'] as string[]; // Roles requeridos para la ruta

  return loginService.authToken$.pipe(
    map((token) => {
     
      if (!token) {
        return false; // Si no hay usuario, no puede acceder
      }

      const rolesDecodificados = loginService.getRolesFromToken();

      // Verificar si el usuario tiene al menos uno de los roles requeridos
      return rolesRequired.some((role) => rolesDecodificados?.includes(role));
    })
  );
};
