import { Component } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arquitectura',
  templateUrl: './arquitectura.page.html',
  styleUrls: ['./arquitectura.page.scss'],
})
export class ArquitecturaPage {
  asignatura: any = {
    nombre: 'Arquitectura',
    codigo: '002D',
    qrGenerado: 'QR67890'
  };

  attendanceProgress: number = 0;
  progressBarColor: string = 'danger';
  scannedQR: string = ''; 

  constructor(private router: Router) {
    this.loadAttendance();
  }

  loadAttendance() {
    const savedAttendance = localStorage.getItem('attendance_' + this.asignatura.qrGenerado);
    if (savedAttendance) {
      this.attendanceProgress = parseInt(savedAttendance, 10);
      this.updateProgressBarColor();
    }
  }

  saveAttendance() {
    localStorage.setItem('attendance_' + this.asignatura.qrGenerado, this.attendanceProgress.toString());
  }

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
            this.scannedQR = decodedText;
            console.log(`Código escaneado: ${decodedText}`);
            alert(`Código escaneado: ${decodedText}`);
            html5QrcodeScanner.clear();
            this.updateAttendanceProgress();
            this.saveAttendance();
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

  updateAttendanceProgress() {
    if (this.attendanceProgress < 100) {
      this.attendanceProgress += 10;
    }

    this.updateProgressBarColor();
  }

  updateProgressBarColor() {
    if (this.attendanceProgress >= 60) {
      this.progressBarColor = 'success';
    } else {
      this.progressBarColor = 'danger';
    }
  }

  goBack() {
    this.router.navigate(['/bienvenida']);
  }
}