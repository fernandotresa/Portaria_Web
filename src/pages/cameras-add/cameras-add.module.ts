import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamerasAddPage } from './cameras-add';

@NgModule({
  declarations: [
    CamerasAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CamerasAddPage),
  ],
})
export class CamerasAddPageModule {}
