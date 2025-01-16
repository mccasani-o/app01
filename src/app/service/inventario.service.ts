import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { DataResponse, Producto } from '../model/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  http = inject(HttpClient);

  constructor() {}

  obtenerProductos(
    numeroPagina: number,
    tamanioPagina: number
  ): Observable<DataResponse> {
    const url = `${environment.API_URL}/inventario/${numeroPagina}/${tamanioPagina}`;
    return this.http.get<DataResponse>(url);
  }
}
