import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
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
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });  
      
      this.events.subscribe('refreshAcls', () => {        
        this.getAcls()
      });
  }

  ionViewDidLoad() {    
    this.getAcls()
  }

  ngOnDestroy() {    
    this.events.unsubscribe('refreshAcls');		
  }

  setFilteredItems(){    
    this.allAcls = this.httpd.getACLByName(this.searchTerm)    
  }

  getAcls(){
    this.allAcls = this.httpd.getAcls()
    
    this.allAcls.subscribe(data => {
        console.log(data)        
    })
  }

  showOptions(group) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(group)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(group)
          }
        },
       {
          text: this.dataInfo.titleRemoveProfile,
          handler: () => {
            this.remove(group)
          }
        },{
          text: this.dataInfo.titleCancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
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
    console.log(acl)

    this.navCtrl.push('AclsAddPage', {loadProfile: true, profile: acl})
  }

  copy(acl){
    this.navCtrl.push('AclsAddPage', {loadProfile: false, profile: acl, copyProfile: true})
  }
  

}
