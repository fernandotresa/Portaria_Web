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
  selector: 'page-guest',
  templateUrl: 'guest.html',
})
export class GuestPage {

  guests: Observable<any>;
  allGuests: any = []

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public actionsheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      /*this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });*/
  }

  ionViewDidLoad() {     
    /*this.searchTerm = "Crisitian "
    this.setFilteredItems()*/
  }

  setFilteredItems(){
    this.searching = false;
    this.guests = this.httpd.getGuestsByName(this.searchTerm)    

    this.guests.subscribe(data => {

      this.allGuests = data.success
      this.checkAllProfiles()
    })  
  } 

  checkAllProfiles(){
    this.allGuests.forEach(element => {
      this.checkProfiles(element)
    });
  }

  checkProfiles(guest){
    
    this.httpd.getAccessProfilesNameGuest(guest.id).subscribe(data => {      
      this.checkProfileContinue(guest, data)
    })
  }  

  checkProfileContinue(guest, data){

    guest.profiles = []

    data.success.forEach(element => {

      let name = element.name
      let str = name + " "
      guest.profiles.push(str)
    });
  }

  goPageAdd(){
    this.navCtrl.push(EmployeeAddPage)
  }

  goPageEdit(guest){
    console.log(guest)
  }

  addEvent(guest){   

    let modal = this.modalCtrl.create('ProfilesLinkPage', {userInfo: guest, userType: 2});
    modal.present();
    modal.onDidDismiss(data => {
      if (data){
        this.setFilteredItems()
        this.uiUtils.showAlertSuccess()
      }
    });
  }   

  openMenu(guest) {

    let actionSheet = this.actionsheetCtrl.create({
      title: this.dataInfo.titleSelectOption,
      cssClass: 'action-sheets-basic-page',
      buttons: [
        /*{
          text: this.dataInfo.titleEdit,
          role: 'destructive',
          icon: 'folder-open',
          handler: () => {
            //this.goPageEdit(guest)
          }                
        }, */  
        {
          text: this.dataInfo.titleAccessRules,
          role: 'destructive',
          icon: 'clipboard',
          handler: () => {
            this.addEvent(guest)
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

}
