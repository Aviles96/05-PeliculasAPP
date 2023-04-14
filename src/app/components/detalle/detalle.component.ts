import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { IonIcon, ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Icon } from 'ionicons/dist/types/components/icon/icon';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {};

  oculto = 150;

  actores: Cast[] = [];

  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  }

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController,
               private dataLocal: DataLocalService
              ) { }

  ngOnInit() {
    // console.log( 'ID', this.id );

    //Si existe la pelicula 
    this.dataLocal.existePelicula( this.id )
     .then( existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this,this.moviesService.getPeliculaDetalle( this.id )
      .subscribe( resp => {
        console.log( resp );
        this.pelicula = resp;
      });

    this,this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      console.log( resp );
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();

  }
  
  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula )
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
