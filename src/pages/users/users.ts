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
  allUsers = []

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
    this.getUsers()  
  }

  getUsers(){
    this.users = this.httpd.getUsers()

    this.users.subscribe(data => {
      this.allUsers = data.success

      this.checkAcls()
    })
  }

  setFilteredItems(){
    this.users = this.httpd.getUserByName(this.searchTerm)    

    this.users.subscribe(data => {
      this.allUsers = data.success
      this.checkAcls()
    })
  } 

  showOptions(user) {

    let id_status = user.id_status    

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: id_status == 1 ? this.dataInfo.titleBlockUser : this.dataInfo.titleActiveUser,
          handler: () => {
            this.changeStatusUser(user)
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

  changeStatusUser(user){
    
    let id_type = user.id_type

    if(id_type === 1)
      this.uiUtils.showAlertError(this.dataInfo.titleAccessDenied)

    else {

      let id_status = user.id_status

      if(id_status == 1)
        this.blockUser(user)
      else
        this.activeUser(user)
    }    
    
  }

  blockUser(user){

    this.uiUtils.showConfirm(this.dataInfo.titleWarning, this.dataInfo.titleDoYouBlockThisUser)
    .then(res => {
      if(res){
        this.blockUserContinue(user)
      }
    })       
  }

  blockUserContinue(user){

    this.httpd.blockUser(user)
    .subscribe( () => {
      this.uiUtils.showAlertSuccess()

      this.getUsers()
    })
  }

  activeUser(user){

    this.uiUtils.showConfirm(this.dataInfo.titleWarning, this.dataInfo.titleDoYouActiveThisUser)
    .then(res => {
      if(res){
        this.activeUserContinue(user)
      }
    })
  }

  activeUserContinue(user){

    this.httpd.activeUser(user)

    .subscribe( () => {
      this.uiUtils.showAlertSuccess()

      this.getUsers()
    })
  }

  checkAcls(){

    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)        
    loading.present() 

    let total = this.allUsers.length - 1
    let index = 0

    this.allUsers.forEach(element => {
      this.httpd.getAclsNameEmployee(element.id).subscribe(data => {      
        this.checkAclsContinue(element, data)
        index++

        if(index === total)
          loading.dismiss()
      })
    }); 
    
    

  }  

  checkAclsContinue(user, data){

    user.acls = []

    data.success.forEach(element => {

      let name = element.name
      let str = name + " "
      user.acls.push(str)
    });
  }
}
