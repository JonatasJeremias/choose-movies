import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ChooseCardComponent } from '../components/choose-card/choose-card.component';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
