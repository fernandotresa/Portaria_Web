import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessPointsPage } from './access-points';

@NgModule({
  declarations: [
    AccessPointsPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessPointsPage),
  ],
})
export class AccessPointsPageModule {}
