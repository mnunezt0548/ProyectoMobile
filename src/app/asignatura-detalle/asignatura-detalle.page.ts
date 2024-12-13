import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { AttendanceService } from '../services/attendance.service';

@Component({
  selector: 'app-asignatura-detalle',
  templateUrl: './asignatura-detalle.page.html',
  styleUrls: ['./asignatura-detalle.page.scss'],
})
export class AsignaturaDetallePage {
  scannedQRs: Set<string> = new Set();
  attendanceHistory: { qr: string; date: string }[] = [];
  attendanceProgress: number = 0;
  progressBarColor: string = 'danger';
  result: string = '';

  asignatura: any = {
    nombre: 'Calidad de Software',
    codigo: '002D',
  };

  constructor(private router: Router, private attendanceService: AttendanceService) {}

  goBack() {
    this.router.navigate(['/bienvenida']);
  }

  async startQRScanner() {
    try {
      console.log('Verificando permisos...');
      const permission = await BarcodeScanner.checkPermission({ force: true });
      console.log('Permisos verificados:', permission);

      if (permission.granted) {
        console.log('Permiso concedido, iniciando escaneo...');
        this.startScanning();
      } else {
        alert('Permiso de cámara denegado.');
      }
    } catch (error) {
      console.error('Error al verificar permisos:', error);
      alert('Hubo un error al verificar los permisos.');
    }
  }

  async startScanning() {
    try {
      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        const scannedQR = result.content;
        console.log('Contenido escaneado:', scannedQR);

        if (!this.isValidQR(scannedQR)) {
          alert('Formato de QR inválido. Por favor, escanea un código válido.');
          return;
        }

        if (this.attendanceService.isQRAlreadyScanned(scannedQR)) {
          const asignaturaRegistrada = this.attendanceService.getQRAsignatura(scannedQR);
          alert(`El código QR ya fue escaneado para la asignatura: ${asignaturaRegistrada}.`);
          return;
        }

        const success = this.attendanceService.registerQR(scannedQR, this.asignatura.nombre);
        if (success) {
          const date = new Date().toLocaleString();
          this.attendanceHistory.push({ qr: scannedQR, date });
          alert(`Asistencia registrada en ${this.asignatura.nombre}\nCódigo: ${scannedQR}\nFecha: ${date}`);
          this.updateAttendanceProgress();
        } else {
          alert('Hubo un problema al registrar el QR.');
        }
      } else {
        alert('No se detectó ningún código QR.');
      }
    } catch (error) {
      console.error('Error al escanear QR:', error);
      alert('Hubo un error al intentar escanear el código QR.');
    }
  }

  isValidQR(qr: string): boolean {
    return true;
  }

  updateAttendanceProgress() {
    if (this.attendanceProgress < 100) {
      this.attendanceProgress += 10;
    }
    this.progressBarColor = this.attendanceProgress >= 60 ? 'success' : 'danger';
  }
}