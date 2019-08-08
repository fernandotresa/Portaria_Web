import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompaniesAddPage } from './companies-add';

@NgModule({
  declarations: [
    CompaniesAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesAddPage),
  ],
})
export class CompaniesAddPageModule {}
