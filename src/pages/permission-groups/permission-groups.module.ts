import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermissionGroupsPage } from './permission-groups';

@NgModule({
  declarations: [
    PermissionGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(PermissionGroupsPage),
  ],
})
export class PermissionGroupsPageModule {}
