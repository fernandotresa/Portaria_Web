import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesAddPage } from './profiles-add';
import { NgCalendarModule  } from 'ionic2-calendar';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    ProfilesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesAddPage),
    NgCalendarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }    
  ]
})
export class ProfilesAddPageModule {}
