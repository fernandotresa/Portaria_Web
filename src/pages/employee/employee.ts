import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';
import { EmployeeAddPage } from '../../pages/employee-add/employee-add';


@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {

  employees: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,   
    public modalCtrl: ModalController, 
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });

      this.employees = this.httpd.getEmployees()
      this.employees.subscribe(data => {
        console.log(data)
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
  }

  setFilteredItems(){
    this.employees = this.httpd.getEmployeesByName(this.searchTerm)    
  } 

  goPageAdd(){
    this.navCtrl.push(EmployeeAddPage)
  }

  goPageEdit(employee){
    this.navCtrl.push(EmployeeAddPage, {informations: employee})
  }

  addEvent(employee){    
    let modal = this.modalCtrl.create('ProfilesLinkPage', {userInfo: employee, userType: 1});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data)

      }
    });
  }   

  addAcl(employee){    
    
    let modal = this.modalCtrl.create('AclsLinkPage', {userInfo: employee, userType: 1});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data)

      }
    });
  }   

}
