import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DinlePage } from './dinle';

@NgModule({
  declarations: [
    DinlePage,
  ],
  imports: [
    IonicPageModule.forChild(DinlePage),
  ],
})
export class DinlePageModule {}
