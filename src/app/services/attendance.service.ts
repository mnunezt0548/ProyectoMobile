import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private scannedQRs: Map<string, string> = new Map(); // QR -> Asignatura

  constructor() {}

  /**
   * Verifica si el QR ya fue escaneado.
   * @param qr Código QR
   * @returns True si ya fue escaneado en cualquier asignatura, False en caso contrario.
   */
  isQRAlreadyScanned(qr: string): boolean {
    return this.scannedQRs.has(qr);
  }

  /**
   * Registra un QR para una asignatura.
   * @param qr Código QR
   * @param asignatura Nombre de la asignatura
   * @returns True si el QR fue registrado exitosamente, False si ya estaba registrado.
   */
  registerQR(qr: string, asignatura: string): boolean {
    if (this.scannedQRs.has(qr)) {
      return false; // Ya está registrado
    }
    this.scannedQRs.set(qr, asignatura);
    return true;
  }

  /**
   * Obtiene la asignatura en la que un QR fue registrado.
   * @param qr Código QR
   * @returns Nombre de la asignatura o null si no está registrado.
   */
  getQRAsignatura(qr: string): string | null {
    return this.scannedQRs.get(qr) || null;
  }
}