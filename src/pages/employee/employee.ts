import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
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
    public actionsheetCtrl: ActionSheetController,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeePage');
    this.searchTerm = "Fernando Augusto"

    this.setFilteredItems()
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

  openMenu(employee) {

    let actionSheet = this.actionsheetCtrl.create({
      title: this.dataInfo.titleSelectOption,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          role: 'destructive',
          icon: 'folder-open',
          handler: () => {
            this.goPageEdit(employee)
          }                
        },   
        {
          text: this.dataInfo.titleAccessRules,
          role: 'destructive',
          icon: 'clipboard',
          handler: () => {
            this.checkAclUser(employee)
          }                
        },          
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close'         
        }
      ]
      
    });
    actionSheet.present();
  }    

  checkAclUser(employee){

    this.httpd.getAclsUserSector(this.dataInfo.userInfo.id)
    .subscribe(data => {

      this.checkAclUserCallback(employee, data)      
    })
  }

  checkAclUserCallback(employee, data){

    console.log(employee)
    console.log(data)

    let haveAcess = false

    let sectorIdEmployee = employee.SETOR_ID

    data.success.forEach(element => {
      
      let sectorId = element.SETOR_ID

      if(sectorId === sectorIdEmployee)
          haveAcess = true      

    });

    if(haveAcess)
      this.addProfile(employee)

    else  
      this.uiUtils.showAlertError(this.dataInfo.titleAccessDenied)
  }

  addProfile(employee){
    let modal = this.modalCtrl.create('ProfilesLinkPage', {userInfo: employee, userType: 1});
    modal.present();
    modal.onDidDismiss(data => {
      
      if (data) {        
        this.uiUtils.showAlertSuccess()
      }
    });
  }

}
