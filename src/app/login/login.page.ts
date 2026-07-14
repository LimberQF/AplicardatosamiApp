import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  usuario = '';
  password = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private toast: ToastController
  ) {}

  login() {
    if(this.usuario === '' || this.password === '') {
      this.mostrarMensaje('Complete los campos para iniciar turno', 'warning');
      return;
    }

    if ((this.usuario.toLowerCase() === 'admin' && this.password === '1234') ||
        (this.usuario.toLowerCase() === 'limber' && this.password === '1234')) {

      localStorage.setItem('token', 'auth-token-admin');
      this.router.navigate(['/home']);
      return;
    }

    this.apiService.getUsuarios().subscribe(
      (usuariosAPI: any[]) => {

        const usuarioValido = usuariosAPI.find(u => u.username.toLowerCase() === this.usuario.toLowerCase());

        if (usuarioValido) {
          localStorage.setItem('token', 'auth-token-seguro-api');
          this.router.navigate(['/home']);
        } else {
          this.mostrarMensaje('Operario no registrado en la base de datos', 'danger');
        }
      },
      (error) => {
        this.mostrarMensaje('Sin conexión de red. Inicie sesión como admin.', 'danger');
      }
    );
  }

  async mostrarMensaje(mensaje: string, color: string) {
    const t = await this.toast.create({
      message: mensaje,
      duration: 2500,
      color: color,
      position: 'bottom'
    });
    t.present();
  }
}
