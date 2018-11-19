import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitantesPage } from './visitantes';

@NgModule({
  declarations: [
    VisitantesPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitantesPage),
  ],
})
export class VisitantesPageModule {}
