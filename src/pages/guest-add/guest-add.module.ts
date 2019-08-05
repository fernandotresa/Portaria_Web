import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestAddPage } from './guest-add';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    GuestAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestAddPage),
    
    SelectSearchableModule
  ],
})
export class GuestAddPageModule {}
