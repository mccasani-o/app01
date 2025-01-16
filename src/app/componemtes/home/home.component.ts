import { Component, Inject } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Menu } from '../../model/menu';
import { EstadoRequests } from '../../model/menu-request';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  menus: Menu[] = [];
  estadoInicial: Menu[] = []; // Estado inicial para comparación  
  selectedMenus: EstadoRequests[] = [];
  hayCambios = false; // Controla si hay cambios en los checkboxes

  constructor(private menuService: MenuService,private  toastr : ToastrService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: (response) => {
        this.menus = response.data.menus;
        // Guardar una copia del estado inicial
        this.estadoInicial = JSON.parse(JSON.stringify(this.menus));
        
      },
      error: (error) => {
        console.error('Error al cargar los menús:', error);
      },
    });
  }

  onMenuChange(menu: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    menu.estado = checkbox.checked;
    menu.manipulado = true;

    if (menu.items && menu.items.length > 0) {
      this.updateChildStates(menu.items, menu.estado);
    }

    this.updateSelectedMenus();
    this.verificarCambios(); // Verifica si hay cambios después de cada acción
  }

  updateChildStates(items: any[], parentState: boolean) {
    items.forEach((item) => {
      item.estado = parentState;
      item.manipulado = true;

      if (item.items && item.items.length > 0) {
        this.updateChildStates(item.items, parentState);
      }
    });
  }

  updateSelectedMenus() {
    this.selectedMenus = [];
    this.collectSelectedMenus(this.menus);
  }

  collectSelectedMenus(items: any[]) {
    items.forEach((item) => {
      if (item.manipulado) {
        this.selectedMenus.push({ id: item.id, estado: item.estado });
      }
      if (item.items && item.items.length > 0) {
        this.collectSelectedMenus(item.items);
      }
    });
  }

  verificarCambios() {
    // Compara el estado actual con el estado inicial
    this.hayCambios = JSON.stringify(this.menus) !== JSON.stringify(this.estadoInicial);
  }

  enviarEstadoAlBackend() {
    if (!this.hayCambios) return; // Evita enviar si no hay cambios

    const requestBody = {
      estadoRequests: this.selectedMenus,
    };

    this.menuService.actualizarEstado(requestBody).subscribe({
      next: (response) => {
        console.log('Estado actualizado exitosamente en el backend:', response);
        // Actualiza el estado inicial después de enviar
        this.estadoInicial = JSON.parse(JSON.stringify(this.menus));
        this.hayCambios = false; // Restablece cambios
        this.toastr.success(response.mensaje, 'Éxito');
      },
      error: (error) => {
        console.error('Error al actualizar el estado en el backend:', error.error.mensaje);
        this.toastr.error(error.error.mensaje, 'Error');
      },
    });
  }
}
