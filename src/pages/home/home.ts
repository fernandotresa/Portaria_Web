import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public dataInfo: DataInfoProvider,    
    public uiUtils: UiUtilsProvider) {
  }

  goPageEmployee(){
    this.navCtrl.push('EmployeePage')
  }

  goPageGuests(){
    this.navCtrl.push('GuestPage')
  }

  goPagePermissions(){
    this.navCtrl.push('ProfilesPage')
  }

}
