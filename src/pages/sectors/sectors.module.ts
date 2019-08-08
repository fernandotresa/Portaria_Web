import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SectorsPage } from './sectors';

@NgModule({
  declarations: [
    SectorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SectorsPage),
  ],
})
export class SectorsPageModule {}
