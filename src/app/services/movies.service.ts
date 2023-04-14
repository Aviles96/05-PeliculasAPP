import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';

//Creacion de constantes presentes en la api de movies
const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos!: Genre[];

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {
    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    return this.http.get<T>( query );
  }

//Funcion para retornar las peliculas populares
  getPopulares(){

    this.popularesPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

    return this.ejecutarQuery<RespuestaMDB>( query );
  }

//Funcion para buscar peliculas el search/movie es la opcion que me da el movie database
buscarPeliculas( texto: string ){
 return this.ejecutarQuery<RespuestaMDB>(`/search/movie?query=${ texto }`);
}


//Funcion para hacer el llamado de la api de movies 
  getFeature() {
    const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1;

    let mesString;
    
    if( mes < 10 ) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  //Servicio para obtener la informacion de la pelicula
  //Despues del ejecutarQuery el <PeliculaDetalle> es la informacion de la interfase que vamos a usar

  getPeliculaDetalle( id: string ) {
    return this,this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  //Detalle de los actores que sale en la pelicula
  getActoresPelicula( id: string ) {
    return this,this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

  //Generos de la peliculas consulatando la api
  cargarGeneros(): Promise<Genre[]> {  

    return new Promise( resolve => {

      this.ejecutarQuery<Genre>(`/genre/movie/list?a=1`)
      .subscribe( resp => {
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });
  }

}
