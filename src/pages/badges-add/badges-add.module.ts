import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BadgesAddPage } from './badges-add';

@NgModule({
  declarations: [
    BadgesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(BadgesAddPage),
  ],
})
export class BadgesAddPageModule {}
