import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../model/data-response';
import { environment } from '../../environments/environment';
import { MenuRequest } from '../model/menu-request';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenusActivos(): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${environment.API_URL}/menus/activo`);
  }

  getMenus(): Observable<DataResponse> {
    return this.http.get<DataResponse>(`${environment.API_URL}/menus`);
  }

  // Método para actualizar un menú
  actualizarEstado(menuData: MenuRequest): Observable<any> {
    debugger;
    return this.http.put(`${environment.API_URL}/menus`, menuData);
  }
}
