import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AclsPage } from './acls';

@NgModule({
  declarations: [
    AclsPage,
  ],
  imports: [
    IonicPageModule.forChild(AclsPage),
  ],
})
export class AclsPageModule {}
