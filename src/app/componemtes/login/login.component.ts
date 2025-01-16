import { Component, inject } from '@angular/core';
import { LoginService } from '../../service/login.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string | null = null;

  loginService = inject(LoginService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['12345', [Validators.required]],
    });
  }

  onSubmit(): void {
    this.loginService.removeToken();
    const { email, clave } = this.loginForm.value;

    this.loginService.login(email, clave).subscribe({
      next: () => {
        this.errorMessage = null;
        this.router.navigateByUrl('home');
      },
      error: (err) => {
        this.errorMessage =
          'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          this.loginService.removeToken();
      },
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
