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

  allSectors: any = []
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

    console.log(this.loadProfile)
    console.log(this.profile)
    //console.log(this.copyProfile)

    this.getSectors()    
  }

  getSectors(){
    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe(data => {

      this.allSectors = data.success
      
      if(this.loadProfile)
          this.loadProfileInfo()  
        
        if(this.copyProfile)
          this.copyProfileInfo()
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

  add(){
    this.httpd.addAcl(this.name, this.permission, this.selectedArray)
    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        this.navCtrl.pop()
      })
    })
  }

  save(){
    this.uiUtils.showConfirm(this.dataInfo.titleRemoveProfile, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.saveContinue()
      }
    })        
  }

  saveContinue(){
    this.httpd.saveAcl(this.profile.id, this.name, this.permission, this.selectedArray)
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
    this.permission = this.profile.permissao        
    
    this.httpd.getAclsSectorsById(this.profile.id)
    .subscribe(data => {
        this.loadSectors(data)
    })
  }

  loadSectors(data){

    data.success.forEach(element => {      
      
      this.allSectors.forEach(sector => {
        if(sector.id === element.id){
          this.selectedSectorClicked(sector)          
          this.selectedArray.push(sector)
        }
      });      
    });
  }

  clearSectors(){
    this.allSectors.forEach(sector => {
      sector.isChecked = false
    });
  }


}

