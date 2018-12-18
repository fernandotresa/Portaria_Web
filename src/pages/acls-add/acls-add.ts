import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-acls-add',
  templateUrl: 'acls-add.html',
})
export class AclsAddPage {

  sectors: Observable<any>;

  profile: any

  name: string
  selectedArray: any = []
  permission: any;

  loadProfile: Boolean = false
  copyProfile: Boolean = false

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.loadProfile = this.navParams.get('loadProfile')
    this.profile = this.navParams.get('profile')
    this.copyProfile = this.navParams.get('copyProfile')
    this.getSectors()    
  }

  getSectors(){
    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe(data => {
      
      console.log(data)      
    })
  }

  selectedSectorClicked(sector){

    sector.isChecked = !sector.isChecked

    if(! sector.isChecked){
      const index = this.selectedArray.indexOf(sector, 0);

      if (index > -1) {
        this.selectedArray.splice(index, 1);
      }      
    }          
    else {
      this.selectedArray.push(sector)  
    }        
  }

  save(){
    this.httpd.addAcl(this.name, this.permission, this.selectedArray)
    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        this.navCtrl.pop()
      })
    })
  }

  copyProfileInfo(){
    this.name = this.profile.name + this.dataInfo.titleCopyProfile
    this.permission = this.profile.permission    
  }

  loadProfileInfo(){
  
    this.name = this.profile.name
    this.permission = this.profile.permission        
  }


}

