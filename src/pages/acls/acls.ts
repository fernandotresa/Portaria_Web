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
  selector: 'page-acls',
  templateUrl: 'acls.html',
})
export class AclsPage {

  allAcls: Observable<any>;

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
        this.getAcls()
      });
  }

  ionViewDidLoad() {    
    this.uiUtils.showToast("Arraste para o lado esquerdo para mais opções")
    this.getAcls()
  }

  setFilteredItems(){    
    this.allAcls = this.httpd.getAccessGroupsByName(this.searchTerm)    
  }

  getAcls(){
    this.allAcls = this.httpd.getAcls()
    this.allAcls.subscribe(data => {
        console.log(data)
    })
  }

  addAcl(){
    this.navCtrl.push('AclsAddPage')
  }

  remove(acl){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemoveProfile, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(acl)
      }
    })    
  }

  removeContinue(acl){
    this.httpd.delAcl(acl).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.getAcls()
        })
    })
  }

  edit(acl){
    this.navCtrl.push('AclsAddPage', {loadProfile: true, profile: acl})
  }

  copy(acl){
    this.navCtrl.push('AclsAddPage', {loadProfile: false, profile: acl, copyProfile: true})
  }
  

}
