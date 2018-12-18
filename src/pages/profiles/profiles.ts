import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  accessGroups: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  date: string;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public events: Events,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });  
      
      this.events.subscribe('refreshProfiles', () => {
        this.getAccessGroups() 
      });
  }  

  ionViewDidLoad() {    
    this.getAccessGroups()    
    this.uiUtils.showToast("Arraste para o lado esquerdo para mais opções")
  }

  ngOnDestroy() {    
    this.events.unsubscribe('refreshProfiles');		
  }

  setFilteredItems(){    
    this.accessGroups = this.httpd.getAccessGroupsByName(this.searchTerm)    
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
    this.navCtrl.push('ProfilesAddPage')  
  }

  remove(group){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemoveProfile, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(group)
      }
    })    
  }

  removeContinue(group){
    this.httpd.delAccessGroups(group).subscribe(data => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.getAccessGroups()
        })
    })
  }

  edit(group){
    this.navCtrl.push('ProfilesAddPage', {loadProfile: true, profile: group})
  }

  copy(group){
    this.navCtrl.push('ProfilesAddPage', {loadProfile: false, profile: group, copyProfile: true})
  }

}
