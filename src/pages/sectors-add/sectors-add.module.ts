import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SectorsAddPage } from './sectors-add';

@NgModule({
  declarations: [
    SectorsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(SectorsAddPage),
  ],
})
export class SectorsAddPageModule {}
