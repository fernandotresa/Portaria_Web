import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-sectors',
  templateUrl: 'sectors.html',
})
export class SectorsPage {

  sectors: Observable<any>;
  employeesSectors: Observable<any>;
  profiles: Observable<any>;

  selectedProfiles: any = []
  selectedEmployees: any = []
  allEmployees: any = []
  callbackProfiles: any;  

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad SectorsPage');
    this.getSectors()
    this.getProfiles()
  }

  getSectors(){
    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe(data => {
      console.log(data)
    })
  }

  getProfiles(){

    this.profiles = this.httpd.getAccessGroups()
      this.profiles.subscribe(data => {
        this.callbackProfiles = data.success
    })
  }

  selectSector(sector){
    console.log(sector)

    this.employeesSectors = this.httpd.getEmployeesBySector(sector.id)

    this.employeesSectors.subscribe(data => {      
      this.allEmployees = data.success
    })
  }

  employeeSelected(employee){
    for( var i = 0; i < this.selectedEmployees.length; i++){ 
      if ( this.selectedEmployees[i] === employee.id) {
        this.selectedEmployees.splice(i, 1);       
        employee.checked = false
        return;
      }
    }
    
    this.selectedEmployees.push(employee.id)
    employee.checked = true
  }

  selectAll(){
    
    this.selectedEmployees.splice(0, this.selectedEmployees.length);

    for( var i = 0; i < this.allEmployees.length; i++){
      this.allEmployees[i].checked = true
      this.selectedEmployees.push(this.allEmployees[i].id)
    }
      
  }

  deselectAll(){
    this.selectedEmployees.splice(0, this.selectedEmployees.length);

    for( var i = 0; i < this.allEmployees.length; i++)
      this.allEmployees[i].checked = false
  }

  save(){    

    this.uiUtils.showConfirm(this.dataInfo.titleMultipleUpdate, this.dataInfo.titleContinueOperation)
    .then(res => {
      if(res){
        this.saveContinue()
      }
    })    
  }

  saveContinue(){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.saveAccessProfileSector(this.selectedProfiles, this.selectedEmployees)
    .subscribe(data => {
      console.log(data)
      loading.dismiss()
    })
  }

  profileSelected(group){       
    for( var i = 0; i < this.selectedProfiles.length; i++){ 
      if ( this.selectedProfiles[i] === group.id) {
        this.selectedProfiles.splice(i, 1);       
        group.checked = false
        return;
      }
    }
    
    this.selectedProfiles.push(group.id)
    group.checked = true
  }

}
