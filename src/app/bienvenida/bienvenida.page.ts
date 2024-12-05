import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {
  fullName: string = 'Matías Felipe Núñez Tobar';

  asignaturas = [
    { nombre: 'Matemáticas', inicio: '08:30', fin: '10:40' },
    { nombre: 'Arquitectura', inicio: '11:30', fin: '13:30' },
    { nombre: 'Calidad de Software', inicio: '14:00', fin: '15:40' },
  ];

  asignaturaActual: { nombre: string; inicio: string; fin: string } | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.actualizarAsignatura();
    // Actualiza cada minuto para reflejar cambios de horario
    setInterval(() => this.actualizarAsignatura(), 60000);
  }

  actualizarAsignatura() {
    const ahora = new Date();
    const horaActual = `${this.pad(ahora.getHours())}:${this.pad(ahora.getMinutes())}`;

    this.asignaturaActual = this.asignaturas.find(
      (asig) => horaActual >= asig.inicio && horaActual <= asig.fin
    ) || null;
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  viewAsignatura(asignatura: any) {
    const rutasPorNombre: { [key: string]: string } = {
      'Calidad de Software': '/asignatura-detalle',
      'Arquitectura': '/arquitectura',
      'Matemáticas': '/matematicas',
    };

    const ruta = rutasPorNombre[asignatura.nombre];
    if (ruta) {
      this.router.navigate([ruta]);
    } else {
      console.error(`No se encontró una ruta para la asignatura: ${asignatura.nombre}`);
    }
  }

  logout() {
    this.router.navigate(['/home']); // Redirige al usuario a la página de inicio de sesión
  }
}