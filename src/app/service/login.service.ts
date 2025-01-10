import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../model/token';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  router = inject(Router);
  // BehaviorSubject para manejar el estado del token
  private _authToken$ = new BehaviorSubject<string | null>(this.getToken());
  // BehaviorSubject para manejar el estado del usuario autenticado
  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());

  // Observables públicos para que otros componentes los usen
  authToken$ = this._authToken$.asObservable();
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, clave: string): Observable<AuthResponse> {
    const payload = { email, clave };

    return this.http
      .post<AuthResponse>(`${environment.API_URL}/usuarios/login`, payload)
      .pipe(
        tap((response) => {

          if (response && response.data) {
            this.saveToken(response.data.token.jwt); // Guardar el token this.storage.set("jwt",response.data.token.jwt)
            this._authToken$.next(response.data.token.jwt); // Actualizar el BehaviorSubject del token
            this._isLoggedIn$.next(true); // Cambiar el estado a logueado
          } else {
            this.removeToken();
          }
        })
      );
  }

  /**
   * Método para cerrar sesión.
   * Elimina el token del almacenamiento local y actualiza los estados.
   */
  logout(): void {
    this.removeToken();
    this._authToken$.next(null); // Actualizar el BehaviorSubject del token
    this._isLoggedIn$.next(false); // Cambiar el estado a no logueado
    this.router.navigateByUrl('login');
  }

  /**
   * Método para obtener el token desde el localStorage.
   * @returns El token guardado o `null` si no existe
   */
  private getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  /**
   * Método para guardar el token en el localStorage.
   * @param token Token a guardar
   */
  private saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('jwt', token);
    }
  }

  /**
   * Método para eliminar el token del localStorage.
   */
  public removeToken(): void {
    
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('jwt');
    }
  }

  /**
   * Verifica si `localStorage` está disponible en el entorno actual.
   * @returns `true` si está disponible, `false` en caso contrario
   */
  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getRolesFromTokenV2(): Observable<string[]> {
    const token = this.getToken(); // Obtener el token desde localStorage o donde lo guardes
    if (!token) return of([]);
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodificar el payload del JWT
      return of(payload.roles || []); // Devolver los roles del token (asume que están en 'roles')
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return of([]);
    }
  }

  public getRolesFromToken(): string[] | null {
    const token=this.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null; // Retornar null si ocurre un error
      }
    }
    return null;
  }
  
}
