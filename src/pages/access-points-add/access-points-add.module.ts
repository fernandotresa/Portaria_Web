import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessPointsAddPage } from './access-points-add';

@NgModule({
  declarations: [
    AccessPointsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessPointsAddPage),
  ],
})
export class AccessPointsAddPageModule {}
