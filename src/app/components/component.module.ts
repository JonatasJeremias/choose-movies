import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChooseCardComponent } from './choose-card/choose-card.component';
import { CardMovieComponent } from './card-movie/card-movie.component';

@NgModule({
  declarations: [ChooseCardComponent, CardMovieComponent],
  exports: [ChooseCardComponent, CardMovieComponent],
  entryComponents: [ChooseCardComponent, CardMovieComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule { }
