import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events} from 'ionic-angular';
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

  allemployees: any = [];

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  elementType = 'img';  
  segmentStatus: any

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,   
    public events: Events,
    public modalCtrl: ModalController, 
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {

      this.searchControl = new FormControl();    

      this.events.subscribe('search-employee:load', name => {        
        this.searchTerm = name
        this.allemployees = []
      });
  }


  ionViewDidLoad() {    
    //this.searchTerm = "Fernando Augusto"
    //this.setFilteredItems()    
  }

  ionViewWillEnter(){
    this.segmentStatus = 'active'    
  }

  onSegmentChange(){
    this.setFilteredItems()
  }

  ngOnDestroy() {    
    this.events.unsubscribe('search-employee:load');		
  }

  setFilteredItems(){

    if(this.searchTerm && this.searchTerm.length > 5){
      if(this.segmentStatus === 'active')      
        this.searchActive()
      else
        this.searchInactive()
    }    
  } 


  searchActive(){
    this.employees = this.httpd.getEmployeesByName(this.searchTerm)
      this.employees.subscribe(data => {
        this.allemployees = data.success
        this.checkAllProfiles()          
      })    
  }

  searchInactive(){
    this.employees = this.httpd.getEmployeesByNameInactive(this.searchTerm)
      this.employees.subscribe(data => {
        this.allemployees = data.success
        this.checkAllProfiles()          
      })    
  }

  checkAllProfiles(){
    this.allemployees.forEach(element => {
      this.checkProfiles(element)
    });
  }

  checkProfiles(employee){
    
    this.httpd.getAccessProfilesNameEmployee(employee.id).subscribe(data => {      
      this.checkProfileContinue(employee, data)
    })
  }  

  checkProfileContinue(employee, data){

    employee.profiles = []

    data.success.forEach(element => {
      let name = element.name
      let str = name + " "
      employee.profiles.push(str)
    });

    this.checkAccessPoints(employee)
  }
  
  checkAccessPoints(employee){
    
    this.httpd.getAccessPointsEmployee(employee.id).subscribe(data => {    
      this.checkAccessPointsContinue(employee, data)
    })
  }

  checkAccessPointsContinue(employee, data){

    employee.accessPoints = []

    data.success.forEach(element => {
      let name = element.name      
      employee.accessPoints.push(name)
    });    
  }

  goPageAdd(){
    this.navCtrl.push(EmployeeAddPage)
  }

  goPageEdit(employee){
    this.navCtrl.push(EmployeeAddPage, {informations: employee})
  }  
 
  checkAclUser(employee){

    this.httpd.getAclsUserSector(this.dataInfo.userInfo.id)
    .subscribe(data => {

      this.checkAclUserCallback(employee, data)      
    })
  }

  checkAclUserCallback(employee, data){

    let haveAcess = false

    if(data.success.length === 0)
      haveAcess = true;        

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
      
      if (data){
        this.setFilteredItems()
        this.uiUtils.showAlertSuccess()
      }              
    });
  }

  remove(employee){
    this.uiUtils.showConfirm(this.dataInfo.titleRemove, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(employee)
      }
    })    
  }

  removeContinue(employee){
    this.httpd.delEmployee(employee).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.allemployees = []
        })
    })
  }

}
