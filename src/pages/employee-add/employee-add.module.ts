import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeeAddPage } from './employee-add';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    EmployeeAddPage,
  ],
  entryComponents: [
  ],
  imports: [
    IonicPageModule.forChild(EmployeeAddPage),
    SelectSearchableModule

  ],
})
export class EmployeeAddPageModule {}
