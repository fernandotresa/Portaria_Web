import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AclsAddPage } from './acls-add';

@NgModule({
  declarations: [
    AclsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AclsAddPage),
  ],
})
export class AclsAddPageModule {}
