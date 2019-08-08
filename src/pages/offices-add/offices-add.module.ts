import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficesAddPage } from './offices-add';

@NgModule({
  declarations: [
    OfficesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficesAddPage),
  ],
})
export class OfficesAddPageModule {}
