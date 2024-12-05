import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArquitecturaPage } from './arquitectura.page';

describe('ArquitecturaPage', () => {
  let component: ArquitecturaPage;
  let fixture: ComponentFixture<ArquitecturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquitecturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
