import {
  Directive,
  inject,
  Input,
  input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { LoginService } from '../service/login.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[hasRol]',
  standalone: true,
})
export class HasRolDirectiveDirective implements OnInit {
  ngOnInit() {
    
  }
  /*
  private templateRef = inject(TemplateRef<any>);
  private viewContainerRef = inject(ViewContainerRef);
  private loginService = inject(LoginService);

  // Convertir los roles del usuario en un signal
  rolesUsuario = toSignal(this.loginService.getRolesFromToken());

  // Input que recibe los roles requeridos para mostrar el contenido
  @Input('hasRol') rolesRequeridos: string[] = [];

  constructor() {}

  ngOnInit() {
    this.actualizarVista();
  }

  private actualizarVista() {
    // Validar si el usuario tiene alguno de los roles requeridos
    const tieneRol = this.rolesRequeridos.some((rol) =>
      this.rolesUsuario()?.includes(rol)
    );

    if (tieneRol) {
      // Si el usuario tiene el rol, mostrar el contenido
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      // Si el usuario no tiene el rol, limpiar la vista
      this.viewContainerRef.clear();
    }
  }
    */
}
