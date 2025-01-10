import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

 const loginService= inject(LoginService);

 const token = loginService['_authToken$'].getValue();
  // Si existe el token, clonamos la solicitud original y añadimos el encabezado
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req; // Si no hay token, usamos la solicitud original


  // Pasamos la solicitud (modificada o no) al siguiente interceptor/manejador
  return next(authReq);
};
