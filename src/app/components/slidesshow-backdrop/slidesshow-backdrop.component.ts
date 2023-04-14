import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula, PeliculaDetalle } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-backdrop',
  templateUrl: './slidesshow-backdrop.component.html',
  styleUrls: ['./slidesshow-backdrop.component.scss'],
})
export class SlidesshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  
//Configuracion de los slideOpts
slideOpts = {
  slidesPerView: 1.3,
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
