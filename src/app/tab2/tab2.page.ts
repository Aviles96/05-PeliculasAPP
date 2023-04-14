import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  peliculasRecientes: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El Hobbit', 'La vida es bella']

  //Le inyectamos el servicio de movies para poder realizar la busqueda ya la opcion de buscarPeliculas esta creada en 
  //movies.service.ts consultando la api para obtener ese valor
  constructor ( private moviesService: MoviesService,
                private modalCtrl: ModalController ) {}

  buscar( event: any ) {
    const valor:string = event.detail.value;

    if( valor.length === 0 ) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;

    this.moviesService.buscarPeliculas( valor )
    .subscribe( resp =>  {
      // console.log( resp );
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  async verDetalle( id: string ) {
    const modal = await this.modalCtrl.create( {
      component: DetalleComponent,
      componentProps: {
        id
      }
    }); 
    modal.present();
  }
}
