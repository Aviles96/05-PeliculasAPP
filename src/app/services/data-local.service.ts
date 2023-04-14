import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private toasCtrl: ToastController,
             ) { 
    this.cargarFavoritos();
    this.initDB();
  }

  async presentToast( message:string ) {
    const toast = await this.toasCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula ( pelicula: PeliculaDetalle ) {
    //Si existe la pelicula no exista metodos duplicados
    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }
    //Toast o aviso 
    this.presentToast( mensaje );
    this.storage.set( 'peliculas', this.peliculas );

    return !existe;
  }

  //Creado como BD para almacenar mis favoritos
    private _storage: Storage | null = null;
 
  async initDB(){
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //Metodo para cargar favoritos guardadas en el storage
  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

   async existePelicula( id: any ) {
    id = Number( id );
    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return ( existe ) ? true : false;
  }


}
