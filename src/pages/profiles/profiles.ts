import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';
import { ProfilesAddPage } from '../../pages/profiles-add/profiles-add';

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
  selectedTypeName: string = ""
  date: string;
  allAccessGroups: any = []
  allAccessGroupsGeneral: any = []

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
      
      this.events.subscribe('refreshProfiles', selected => {
        this.setSelectedType(selected)
      });
  }  

  ionViewDidLoad() {    
  }

  ngOnDestroy() {    
    this.events.unsubscribe('refreshProfiles');		
  }

  setFilteredItems(){    
    this.accessGroups = this.httpd.getAccessGroupsByName(this.searchTerm)    
  }
  
  addPermissionGroups(){
    console.log(this.selectedTypeName, this.selectedType)

    this.navCtrl.push(ProfilesAddPage, {'selectedTypeName': this.selectedTypeName, 'selectedType': this.selectedType})  
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

          this.setSelectedType(this.selectedType)
          
        })
    })
  }

  edit(group){

    this.navCtrl.push(ProfilesAddPage, {loadProfile: true, profile: group, 
      'selectedTypeName': this.selectedTypeName, 'selectedType': this.selectedType})
  }

  copy(group){
    this.navCtrl.push(ProfilesAddPage, {loadProfile: false, profile: group, copyProfile: true, 
      'selectedTypeName': this.selectedTypeName, 'selectedType': this.selectedType})
  }

  setSelectedType(type: number){    

    this.selectedType = type
    this.httpd.getAccessGroupsTypeById(this.selectedType)

    .subscribe(data => {
        this.setSelectedTypeCallback(data, type)      
    })
  }

  setSelectedTypeCallback(data, type: number){
    this.allAccessGroups = data.success

      if(this.allAccessGroups.length > 0){
        this.selectedTypeName = this.allAccessGroups[0].type
      }        
      else 
        this.checkAccessTypes(type)
  }

  checkAccessTypes(type: number){

    this.httpd.getAccessGroupsTypes(type)
    .subscribe(data => {

        this.checkAccessTypesCallback(data)
    })
  }

  checkAccessTypesCallback(data){
    let datas = data.success[0]
    this.selectedTypeName = datas.name    
  }

  showGroupsTypes(){
    this.selectedType = 0
  }

}
