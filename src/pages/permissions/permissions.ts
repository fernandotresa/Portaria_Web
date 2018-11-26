import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-permissions',
  templateUrl: 'permissions.html',
})
export class PermissionsPage {

  accessGroups: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  date: string;
  type: 'string'; 

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });      
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionsPage');
    this.getAccessGroups()
  }

  setFilteredItems(){
    this.accessGroups = this.httpd.getEmployeesByName(this.searchTerm)    
  }
  
  getAccessGroups(){

    this.accessGroups = this.httpd.getAccessGroups()
      this.accessGroups.subscribe(data => {
        console.log(data)
    })
  }

  goPermissionGroups(group){
    console.log(group)    
  }

  addPermissionGroups(){
    this.navCtrl.push('PermissionGroupsPage')  
  }

}
