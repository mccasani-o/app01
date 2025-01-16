import { Component, inject, OnInit } from '@angular/core';
import { Producto } from '../../../model/producto';
import { InventarioService } from '../../../service/inventario.service';
import { ToastrService } from 'ngx-toastr';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, HttpClientModule,RouterLink, RouterLinkActive],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export default class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  first = 0;

  rows = 10;

  totalRecords: number = 0;
  tamanioPagina: number = 5; // Tamaño inicial de la página
  loading: boolean = false;

  router = inject(Router);
  toastr = inject(ToastrService);
  inventarioService = inject(InventarioService);

  ngOnInit(): void {
    this.cargarProductos(0, this.tamanioPagina);
  }

  cargarProductos(pagina: number, tamanio: number): void {
    this.inventarioService.obtenerProductos(pagina, tamanio).subscribe({
      next: (response) => {
        // Validar que la respuesta tenga los datos necesarios
        if (response.data && response.data.producto) {
          this.productos = response.data.producto; // Lista de productos
          this.totalRecords = response.data.total; // Total de registros
          this.toastr.success(response.mensaje, 'Éxito');
        } else {
          this.toastr.warning('No se encontraron datos.', 'Advertencia');
        }
        this.loading = false; // Desactivar el indicador de carga
      },
      error: (error) => {
        this.loading = false; // Desactivar el indicador de carga
        this.toastr.error(
          error.error?.mensaje || 'Error al cargar los productos',
          'Error'
        );
      },
    });
  }


  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  goToRegisterProducto() {
    this.router.navigate(['/producto/registro']);
  }

}
