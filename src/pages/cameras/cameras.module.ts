import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamerasPage } from './cameras';

@NgModule({
  declarations: [
    CamerasPage,
  ],
  imports: [
    IonicPageModule.forChild(CamerasPage),
  ],
})
export class CamerasPageModule {}
