import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuarios: any[] = [];
  coordenadas: any;

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.cargarUsuarios();
    await this.obtenerUbicacion();
  }

  cargarUsuarios() {
    this.apiService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Cargando respaldo offline', error);
      }
    );
  }

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.coordenadas = { lat: position.coords.latitude, lng: position.coords.longitude };
    } catch (e) {
      console.error('Error GPS', e);
    }
  }


  confirmarUbicacion() {
    const payload = {
      id: 1,
      ubicacion: 'Pasillo 4 - Rack B2',
      estado: 'Almacenado'
    };


    this.apiService.actualizarUbicacionPallet(1, payload).subscribe(async (respuesta) => {

      const toast = await this.toastController.create({
        message: '✅ Pallet #PAL-8492 reubicado exitosamente.',
        duration: 2500,
        color: 'success',
        position: 'bottom'
      });
      await toast.present();
    });
  }
}
