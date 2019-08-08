import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportsPage } from './imports';

@NgModule({
  declarations: [
    ImportsPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportsPage),
  ],
})
export class ImportsPageModule {}
