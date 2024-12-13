import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroActividadPage } from './registro-actividad.page';

describe('RegistroActividadPage', () => {
  let component: RegistroActividadPage;
  let fixture: ComponentFixture<RegistroActividadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
