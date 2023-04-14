import { Component, OnInit, Input } from '@angular/core';
import { Pelicula, PeliculaDetalle } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-poster',
  templateUrl: './slidesshow-poster.component.html',
  styleUrls: ['./slidesshow-poster.component.scss'],
})
export class SlidesshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  
  //Configuracion de los slideOpts
  slideOpts = {
    slidesPerView: 3.1,
    freeMode: true
  };
//Importar el modal 
constructor( private modalCtrl: ModalController ) { }

ngOnInit() {}

//Funcion para tener la informacion de la pelicula
//Se usa el await ya que vamos a tener una promesa o respuesta y al hacerlo hay que usar el async
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
