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
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  accessGroups: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;
  selectedType: number = 0
  date: string;
  allAccessGroups: any = []

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
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
    //this.getAccessGroups()    
  }

  ngOnDestroy() {    
    this.events.unsubscribe('refreshProfiles');		
  }

  setFilteredItems(){    
    this.accessGroups = this.httpd.getAccessGroupsByName(this.searchTerm)    
  }
  
  getAccessGroups(){
    this.accessGroups = this.httpd.getAccessGroups()      
    
  }

  addPermissionGroups(){
    this.navCtrl.push('ProfilesAddPage')  
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

  setSelectedType(type: number){    
    this.selectedType = type
    this.accessGroups = this.httpd.getAccessGroupsTypeById(this.selectedType)

    this.accessGroups.subscribe(data => {
      this.allAccessGroups = data
    })
  }

  showGroupsTypes(){
    this.selectedType = 0
  }

}
