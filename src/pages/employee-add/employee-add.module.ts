import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeAddPage } from './employee-add';

@NgModule({
  declarations: [
    EmployeeAddPage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeeAddPage),
  ],
})
export class EmployeeAddPageModule {}
