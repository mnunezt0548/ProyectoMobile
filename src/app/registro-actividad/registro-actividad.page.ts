import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-actividad',
  templateUrl: './registro-actividad.page.html',
  styleUrls: ['./registro-actividad.page.scss'],
})
export class RegistroActividadPage {
  activity = {
    name: '',
    dateTime: ''  // Cambiado a dateTime para almacenar la fecha y hora juntos
  };

  // Establecer la fecha mínima en la fecha actual
  minDate: string = new Date().toISOString();

  activities: { name: string, dateTime: string }[] = [];

  constructor(private router: Router) {}

  saveActivity() {
    if (this.activity.name && this.activity.dateTime) {
      // Guardar la actividad (esto puede ser en localStorage, un servicio, o una API)
      const activities = JSON.parse(localStorage.getItem('activities') || '[]');
      activities.push(this.activity);
      localStorage.setItem('activities', JSON.stringify(activities));

      // Después de guardar, navegar de vuelta a la página de bienvenida
      this.router.navigate(['/bienvenida']);
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}