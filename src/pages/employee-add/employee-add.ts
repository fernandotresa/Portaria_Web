import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage {

  workFunctions: Observable<any>;
  employeeTypes: Observable<any>;
  sectors: Observable<any>;
  companies: Observable<any>;
  offices: Observable<any>;

  name: string;
  commumName: string;
  rg: string;
  cpf: string;
  district: string;
  tel: string;
  ramal: string;
  registration: string;
  badge: string;
  employeeType: any;
  employeeFunction: any;
  employeeSector: any;
  employeeCompany: any;
  employeeOffice: any;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeAddPage');    
    this.startInterface()
  }

  startInterface(){

    this.workFunctions = this.httpd.getWorkFunctions()
    this.workFunctions.subscribe(data => {
      console.log(data)
    })

    this.employeeTypes = this.httpd.getEmployeeTypes()
    this.employeeTypes.subscribe(data => {
      console.log(data)
    })

    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe(data => {
      console.log(data)
    })

    this.companies = this.httpd.getCompanies()
    this.companies.subscribe(data => {
      console.log(data)
    })

    this.offices = this.httpd.getOffices()
    this.offices.subscribe(data => {
      console.log(data)
    })

  }

  

}
