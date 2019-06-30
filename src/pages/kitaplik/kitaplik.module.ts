import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KitaplikPage } from './kitaplik';

@NgModule({
  declarations: [
    KitaplikPage,
  ],
  imports: [
    IonicPageModule.forChild(KitaplikPage),
  ],
})
export class KitaplikPageModule {}
