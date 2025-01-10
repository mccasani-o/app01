import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Menu } from '../../model/menu';
import { MenuService } from '../../service/menu.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-nadvar',
  standalone: true,
  imports: [ButtonModule, RouterLink, RouterLinkActive,],
  templateUrl: './nadvar.component.html',
  styleUrl: './nadvar.component.css',
})
export class NadvarComponent implements OnInit {
  menus: Menu[] = [];

  constructor(   private router: Router,private menuService: MenuService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.menuService.getMenusActivos().subscribe({
      next: (response) => {
        this.menus = response.data.menus; // Asigna los menús a la variable local
      },
      error: (error) => {
        console.error('Error al obtener los menús:', error);
      },
    });
  }

  logout() {
   this.loginService.logout();
   this.router.navigate(['/login']);
  }
}
