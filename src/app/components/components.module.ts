import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidesshowBackdropComponent } from './slidesshow-backdrop/slidesshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlidesshowPosterComponent } from './slidesshow-poster/slidesshow-poster.component';
import { SlidesshowParesComponent } from './slidesshow-pares/slidesshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  entryComponents: [
    DetalleComponent
  ],

  declarations: [
    SlidesshowBackdropComponent,
    SlidesshowPosterComponent,
    SlidesshowParesComponent,
    DetalleComponent
  ],
  exports: [
    SlidesshowBackdropComponent,
    SlidesshowPosterComponent,
    SlidesshowParesComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
  ]
})
export class ComponentsModule { }
