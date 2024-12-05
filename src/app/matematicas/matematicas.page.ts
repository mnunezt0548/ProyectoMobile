import { Component } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.page.html',
  styleUrls: ['./matematicas.page.scss'],
})
export class MatematicasPage {
  asignatura: any = {
    nombre: 'Matemáticas',
    codigo: '003D',
    qrGenerado: 'QR12345' // Este es un ejemplo de un código QR único para la clase.
  };

  attendanceProgress: number = 0;
  progressBarColor: string = 'danger';
  scannedQR: string = '';  // Para almacenar el código QR escaneado.

  constructor(private router: Router) {  // Inyectar Router
    // Verificar si hay asistencia guardada en el Local Storage
    this.loadAttendance();
  }

  // Método para cargar los datos de asistencia
  loadAttendance() {
    const savedAttendance = localStorage.getItem('attendance_' + this.asignatura.qrGenerado);
    if (savedAttendance) {
      this.attendanceProgress = parseInt(savedAttendance, 10);
      this.updateProgressBarColor();
    }
  }

  // Método para guardar los datos de asistencia
  saveAttendance() {
    localStorage.setItem('attendance_' + this.asignatura.qrGenerado, this.attendanceProgress.toString());
  }

  // Método para comenzar el escáner QR
  startQRScanner() {
    try {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      html5QrcodeScanner.render(
        (decodedText: string, decodedResult: any) => {
          if (this.scannedQR !== decodedText) {
            this.scannedQR = decodedText; // Guardar el código QR escaneado.
            console.log(`Código escaneado: ${decodedText}`);
            alert(`Código escaneado: ${decodedText}`);
            html5QrcodeScanner.clear();
            this.updateAttendanceProgress();
            this.saveAttendance(); // Guardar la asistencia después de escanear.
          } else {
            alert("Este código QR ya fue escaneado. Escanea un nuevo código.");
          }
        },
        (error: any) => {
          console.warn(`Error al escanear: ${error}`);
        }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error inicializando el escáner:', error.message);
      } else {
        console.error('Error desconocido:', error);
      }
    }
  }

  // Método para actualizar el progreso de la asistencia
  updateAttendanceProgress() {
    if (this.attendanceProgress < 100) {
      this.attendanceProgress += 10;
    }

    this.updateProgressBarColor(); // Actualizar el color de la barra.
  }

  // Actualizar el color de la barra según el progreso
  updateProgressBarColor() {
    if (this.attendanceProgress >= 60) {
      this.progressBarColor = 'success';
    } else {
      this.progressBarColor = 'danger';
    }
  }

  // Método para ir a la vista anterior utilizando el Router
  goBack() {
    this.router.navigate(['/bienvenida']);  // Cambiar a la ruta de bienvenida
  }
}