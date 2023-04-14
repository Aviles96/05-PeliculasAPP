import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula, PeliculaDetalle } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slidesshow-pares',
  templateUrl: './slidesshow-pares.component.html',
  styleUrls: ['./slidesshow-pares.component.scss'],
})
export class SlidesshowParesComponent implements OnInit {

  
@Input() peliculas: Pelicula[] = [];
@Output() cargarMas= new EventEmitter();
  
//Configuracion de los slideOpts
slideOpts = {
  slidesPerView: 3.3,
  freeMode: true,
  spaceBetween: -10
};

  //Importar el modal 
  constructor( private modalCtrl: ModalController ) { }


  onClick() {
    this.cargarMas.emit();
  }


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
