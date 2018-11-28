import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesAddPage } from './profiles-add';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    ProfilesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesAddPage),
    NgCalendarModule
  ],
})
export class ProfilesAddPageModule {}
