import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-profiles-link',
  templateUrl: 'profiles-link.html',
})
export class ProfilesLinkPage {

  profiles: Observable<any>;
  selectedProfiles: any = []
  profilesArray: any = []
  userInfo: any;
  userType: number = 0
  callbackProfiles: any;
  selectedProfileType: number = 0

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.userInfo = this.navParams.get('userInfo')
    this.userType = this.navParams.get('userType')

    console.log(this.userInfo)
    this.getProfiles()
  }

  getProfiles(){

    this.profiles = this.httpd.getAccessGroups()
      this.profiles.subscribe(data => {

        this.callbackProfiles = data.success
        this.getProfileUserinfo()
    })
  }

  getProfileUserinfo(){
    if(this.userType == 1)
      this.getAccessProfileEmployee()  
      
    else
      this.getAccessProfileGuests()    
  }

  getAccessProfileEmployee(){
    this.httpd.getAccessProfileEmployee(this.userInfo.id).subscribe(data => {      
      this.getProfileUserinfoContinue(data)
    })
  }

  getAccessProfileGuests(){
    this.httpd.getAccessProfileGuests(this.userInfo.id).subscribe(data => {      
      this.getProfileUserinfoContinue(data)
    })
  }

  getProfileUserinfoContinue(data){
    
    data.success.forEach(element => {

      let id_profile = element.id_profile
      this.checkProfile(id_profile)
    });
  }

  checkProfile(id_profile){
    
    this.callbackProfiles.forEach(element => {
      
      if(element.id == id_profile){
        element.checked = true

        this.selectedProfiles.push(element.id)
      }
    });
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

  save(){
    if(this.userType == 1)
      this.saveProfileEmployee()  

    else
      this.saveProfileGust()    
  }

  saveProfileEmployee(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present() 

    this.httpd.saveAccessProfileEmployee(this.selectedProfiles, this.userInfo.id)
    .subscribe( () => {
      loading.dismiss() 
      this.viewCtrl.dismiss(this.selectedProfiles); 
    })    
  }

  saveProfileGust(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present() 

    this.httpd.saveAccessProfileGuest(this.selectedProfiles, this.userInfo.id)
    .subscribe( () => {
      loading.dismiss() 
      this.viewCtrl.dismiss(this.selectedProfiles);      
    })    
  }

  cancel(){
    this.viewCtrl.dismiss()
  }

}
