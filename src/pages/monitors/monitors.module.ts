import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitorsPage } from './monitors';

@NgModule({
  declarations: [
    MonitorsPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitorsPage),
  ],
})
export class MonitorsPageModule {}
