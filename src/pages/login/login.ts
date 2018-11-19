import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  allConfigs: Observable<any>;
  autoLogin: Boolean = true
  username: string
  password: string

  constructor(public navCtrl: NavController, 
    public dataInfo: DataInfoProvider,
    public uiUtils: UiUtilsProvider,
    public authProvider: AuthProvider,
    public navParams: NavParams,
    public storage: Storage,
    public httpd: HttpdProvider) {
    
    this.storage.set('ion_did_tutorial', 'true')      
  }

  ionViewDidLoad() {
    var self = this  
    
    this.autoLogin = this.navParams.get("autoLogin")

    if(this.autoLogin == undefined)
      this.autoLogin = true   
      
      this.loginContinue("admin", "Restrito2018")
  }

  
  goHome(){
    this.navCtrl.setRoot(HomePage, {primeiroUso: false});
  }

  loginUser(): void {        

    if (this.username.length < 5){
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleUsernameMinLenght).present()

    } else if (this.password.length < 5){
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titlePasswordMinLenght).present()
      
    } else {
      this.loginContinue(this.username, this.password)    
    }
  }

  loginContinue(email, pass){
    
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present() 
    var self = this

    this.httpd.getAuth(email, pass)

    .subscribe( data => {
      self.goHome()
      loading.dismiss().then( () => {                                

      });
    }, error => {
      loading.dismiss().then( () => {
        self.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleAuthError).present()
      });
    });    
  }

  goToSignup(): void {
    //this.navCtrl.push(SignupPage);
  }
  
  goToResetPassword(): void {
    
    /*if (this.username.length > 0){
      this.authProvider.resetPassword(this.username).then( () => {
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckMailbox).present()

      }, error => {
          this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleAuthRecoveryError)          
      });  

    } else 
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleAuthRecoveryError)
        */
      
  }

}
