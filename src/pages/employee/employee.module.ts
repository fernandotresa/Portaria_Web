import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmployeePage } from './employee';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    EmployeePage,
  ],
  imports: [
    IonicPageModule.forChild(EmployeePage),
    NgxQRCodeModule
  ],
})
export class EmployeePageModule {}
