import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestAddPage } from './guest-add';

@NgModule({
  declarations: [
    GuestAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestAddPage),
  ],
})
export class GuestAddPageModule {}
