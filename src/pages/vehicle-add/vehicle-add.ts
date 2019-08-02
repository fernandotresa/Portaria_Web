import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-vehicle-add',
  templateUrl: 'vehicle-add.html',
})
export class VehicleAddPage {

  type: any;
  model: any;
  brands: any;
  plate: any;

  vehicles: any = []

  constructor(public viewCtrl: ViewController,           
    public uiUtils: UiUtilsProvider,
    public navParams: NavParams,
    public dataInfo: DataInfoProvider) {
  }

  ionViewDidLoad() {
    
    this.vehicles = this.navParams.get('vehicles')
    console.log(this.vehicles)

    if(! this.vehicles)
      this.vehicles = []

    this.clear()
  }

  clear(){
    this.type = ""
    this.model = ""
    this.brands = ""
    this.plate = ""
  }

  clearAll(){
    this.clear()
    this.vehicles = []
  }

  add(){
    let data = {type: this.type, model: this.model, brand: this.brands, plate: this.plate}
    this.vehicles.push(data)
    this.clear()
  }

  save(){
    this.viewCtrl.dismiss(this.vehicles);
  }

  goBack(){
    this.viewCtrl.dismiss(this.vehicles);
  }

}
