import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
//Hacer el llamado de las peliculas usando las interfaces
  peliculasRecientes: Pelicula[] = [];
//Hacer el retorno de las peliculas populares
  populares: Pelicula[] = [];

//Inyectando el servicio de la api de movies
  constructor( private  moviesService: MoviesService ) {}

  ngOnInit() {
    this.moviesService.getFeature()
      .subscribe( resp => {
        this.peliculasRecientes = resp.results;
      });

      this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
    .subscribe( resp => {
      //console.log( 'Populares', resp);
      const arrTemp = [ ...this.populares, ...resp.results ];
      //Anadir mas peliculas a las actuales
      this.populares = arrTemp;
    });
  }
}
