import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersPage } from '../../pages/users/users';
import { AccessPointsPage } from '../../pages/access-points/access-points';
import { BadgesPage } from '../../pages/badges/badges';
import { CamerasPage } from '../../pages/cameras/cameras';
import { ImportsPage } from '../../pages/imports/imports';
import { SystemsPage } from '../../pages/systems/systems';

@IonicPage()
@Component({
  selector: 'page-administrator',
  templateUrl: 'administrator.html',
})
export class AdministratorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministratorPage');
  }

  goPageUsers(){
    this.navCtrl.push(UsersPage)
  }

  goPageAccessPoints(){
    this.navCtrl.push(AccessPointsPage)
  }

  goPageBadges(){
    this.navCtrl.push(BadgesPage)
  }

  goPageMonitor(){
    this.navCtrl.push(CamerasPage)
  }

  goPageImport(){
    this.navCtrl.push(ImportsPage)
  }

  goPageSystem(){
    this.navCtrl.push(SystemsPage)
  }



}
