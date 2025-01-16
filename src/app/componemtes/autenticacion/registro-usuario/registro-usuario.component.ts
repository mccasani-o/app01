import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.css',
})
export default class RegistroUsuarioComponent {
  registroForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  usuariosService = inject(LoginService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    debugger;
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  registrar(): void {
    debugger;
    if (this.registroForm.valid) {
      this.usuariosService.registrarUsuario(this.registroForm.value).subscribe({
        next: (response) => {
          this.mensajeExito = 'Registro exitoso.';
          this.mensajeError = null;
          this.goToLogin();
        },
        error: (error) => {
          this.mensajeError = 'Ocurrió un error durante el registro.';
          this.mensajeExito = null;
          console.error('Error:', error);
        },
      });
    } else {
      this.mensajeError = 'Por favor, completa todos los campos requeridos.';
      this.mensajeExito = null;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
