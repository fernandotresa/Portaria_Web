import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-acls-link',
  templateUrl: 'acls-link.html',
})
export class AclsLinkPage {

  allAcls: Observable<any>;
  acls: any = []    
  userInfo: any
  userType: number  = 0

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
    this.getAcls()
  }

  getAcls(){
    this.acls = []
    this.allAcls = this.httpd.getAcls()

    this.allAcls.subscribe(data => {                
      this.acls = data.success
      this.getAclEmployee()
    })
  }

  getAclEmployee(){

    this.httpd.getAclsEmployee(this.userInfo.id)
    .subscribe(data => {

        this.getAclEmployeeContinue(data)
    })
  }

  getAclEmployeeContinue(data){
    
    let dataS = data.success
    for(var j = 0; j < dataS.length; ++j){

      let id = dataS[j].id_acl      

      for( var i = 0; i < this.acls.length; i++){ 
             
        if ( this.acls[i].id === id) {                  
          this.acls[i].checked = true          
        }
      } 
    }     
  }

  aclSelected(acl){

    for( var i = 0; i < this.acls.length; i++){             
      if (this.acls[i].id === acl.id) {        
        acl.checked = !acl.checked
      }
    }            
  }

  cancel(){
    this.navCtrl.pop()
  }

  save(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present() 

    let aclCheckeds = []

    for( var i = 0; i < this.acls.length; i++){ 
      if ( this.acls[i].checked) {
        aclCheckeds.push(this.acls[i])
      }
    }  

    this.httpd.saveAclsEmployee(aclCheckeds, this.userInfo.id)
    .subscribe( () => {
      loading.dismiss() 
      this.viewCtrl.dismiss(aclCheckeds);      
    })  
  }

}
