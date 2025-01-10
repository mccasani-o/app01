import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HasRolGuard } from './core/guards/has-rol.guard';

export const routes: Routes = [

  {
    canMatch: [AuthGuard],
    path: '',
    loadComponent: () => import('./componemtes/layout/layout.component'),
    children: [
      {
        path: 'home',

        canActivate: [HasRolGuard],
        data:{roles:['ROLE_USER', 'ROLE_ADMIN']},
        loadComponent: () => import('./componemtes/home/home.component'),
      },
      {
        path: 'venta/generar-venta',
        canActivate: [HasRolGuard],
        data:{roles:['ROLE_ADMIN']},
        loadComponent: () => import('./componemtes/venta/generar-venta/generar-venta.component'),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./componemtes/login/login.component'),
   
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
