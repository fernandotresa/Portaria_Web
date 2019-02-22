import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, ActionSheetController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  users: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,       
    public modalCtrl: ModalController, 
    public actionSheetCtrl: ActionSheetController,
    public dataInfo: DataInfoProvider) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');

    this.users = this.httpd.getUsers()
  }

  setFilteredItems(){
    this.users = this.httpd.getUserByName(this.searchTerm)    
  } 

  showOptions(user) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleBlockUser,
          handler: () => {
            this.blockUser(user)
          }
        },
        {
          text: this.dataInfo.titleAcls,
          handler: () => {
            this.addAcl(user)
          }
        },
        {
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

  addAcl(user){    
    
    let modal = this.modalCtrl.create('AclsLinkPage', {userInfo: user});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.uiUtils.showAlertSuccess()

      }
    });
  }   

  blockUser(user){
    console.log(user)
  }

}
