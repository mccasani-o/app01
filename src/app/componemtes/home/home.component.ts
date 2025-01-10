import { Component } from '@angular/core';
import { MenuService } from '../../service/menu.service';
import { Menu } from '../../model/menu';
import { MenuRequest } from '../../model/menu-request';
import { EstadoRequests } from '../../model/estado-requests';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent {
  menus: Menu[] = []; 
  //selectedMenus: { id: number; estado: boolean }[] = []; 
  selectedMenus: EstadoRequests[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
 
    this.menuService.getMenus().subscribe({
      next: (response) => {
        this.menus = response.data.menus;
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
    debugger;
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

  enviarEstadoAlBackend() {
    debugger;
    const requestBody = {
      estadoRequests: this.selectedMenus,
    };

    this.menuService.actualizarEstado(requestBody).subscribe({
      next: (response) => {
        console.log('Estado actualizado exitosamente en el backend:', response);
      },
      error: (error) => {
        console.error('Error al actualizar el estado en el backend:', error);
      },
    });
  }
}
