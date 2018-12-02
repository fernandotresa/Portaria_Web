import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilesLinkPage } from './profiles-link';

@NgModule({
  declarations: [
    ProfilesLinkPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilesLinkPage),
  ],
})
export class ProfilesLinkPageModule {}
