import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfficesPage } from './offices';

@NgModule({
  declarations: [
    OfficesPage,
  ],
  imports: [
    IonicPageModule.forChild(OfficesPage),
  ],
})
export class OfficesPageModule {}
