import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GatekeeperPage } from './gatekeeper';

@NgModule({
  declarations: [
    GatekeeperPage,
  ],
  imports: [
    IonicPageModule.forChild(GatekeeperPage),
  ],
})
export class GatekeeperPageModule {}
