import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  idAcl: number = 0

  allSectors: any = []
  selectedArray: any = []
  permission: any;

  loadProfile: Boolean = false
  copyProfile: Boolean = false

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public events: Events,
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

      this.allSectors = data.success
      
      if(this.loadProfile)
          this.loadProfileInfo()  
        
        if(this.copyProfile)
          this.copyProfileInfo()
    })
  }

  selectedSectorClicked(sector){

    sector.isChecked = !sector.isChecked
    
    console.log("Clicando ", sector.isChecked, sector.id, this.selectedArray.length)

    if(! sector.isChecked){
      const index = this.selectedArray.indexOf(sector, 0);
      console.log("Removendo ", index, sector)

      if (index > -1) {        

        this.selectedArray.splice(index, 1);
        sector.isChecked = false
      }      
    }          
    else {
      this.selectedArray.push(sector)  
      sector.isChecked = true
    }        
  }

  getSelectedSectors(){

    let array = []

    this.selectedArray.forEach(element => {
      if(element.isChecked)
        array.push(element)
    });

    console.log("Selecionados: ", array)
    return array;
  }

  add(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present()     

    this.httpd.addAcl(this.name, this.permission, this.getSelectedSectors())
    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('refreshAcls', 1);

      }).catch( () => {
        loading.dismiss()
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSaveError).present()
      })
    })
  }

  save(){

    this.uiUtils.showConfirm(this.dataInfo.titleWarning, this.dataInfo.titleDoYouWantUpdate)
    .then(res => {
      if(res){
        this.saveContinue()
      }
    })        
  }

  saveContinue(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present() 

    this.httpd.saveAcl(this.profile.id, this.name, this.permission, this.getSelectedSectors())
    .subscribe( () => {

        loading.dismiss()
        this.uiUtils.showAlertSuccess()      
        this.navCtrl.pop()

        this.selectedArray = []
        this.events.publish('refreshAcls', 1);
    })
  }

  copyProfileInfo(){
    this.loadProfileInfo()
    this.name = this.profile.name + this.dataInfo.titleCopyProfile    
    this.idAcl = 0
  }

  loadProfileInfo(){
    
    this.name = this.profile.name
    this.permission = this.profile.permissao  
    this.idAcl = this.profile.id      
    
    this.httpd.getAclsSectorsById(this.profile.id)
    .subscribe(data => {
        this.loadSectors(data)
    })
  }

  loadSectors(data){

    console.log(data.success)

    data.success.forEach(element => {      
      
      this.allSectors.forEach(sector => {

        if(sector.id === element.id_sector){
          this.selectedSectorClicked(sector)          

          this.selectedArray.push(sector)

          sector.isChecked = true
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

