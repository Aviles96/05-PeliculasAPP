import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Genre, PeliculaDetalle, Pelicula } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  //@Input() peliculas!: PeliculaDetalle[];
  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];


  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService) {}

  //Carga de manera inmedianta las peliculas favoritas
  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas);
  }


  //Funcion para seleccionar mis favoritos por genero 
  pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {

    this.favoritoGenero = [];

    generos.forEach( genero => {
      this.favoritoGenero.push( {
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres?.find( genre => genre.id === genero.id );
        })
      });
    });
  }

}
