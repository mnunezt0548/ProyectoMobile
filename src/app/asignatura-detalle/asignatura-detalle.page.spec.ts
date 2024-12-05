import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asignatura-detalle',
  templateUrl: './asignatura-detalle.page.html',
  styleUrls: ['./asignatura-detalle.page.scss'],
})
export class AsignaturaDetallePage implements OnInit {
  asignatura: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.asignatura = params['asignatura'];
    });
  }
}