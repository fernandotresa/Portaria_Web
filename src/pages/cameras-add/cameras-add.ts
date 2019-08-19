import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-cameras-add',
  templateUrl: 'cameras-add.html',
})
export class CamerasAddPage {

  info: any
  id: number = 0
  name: string
  status: string
  channel: string    
  url: string
  ipAddress: string  
  
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
    this.loadProfile = this.navParams.get('load')
    this.copyProfile = this.navParams.get('copy')

    this.info = this.navParams.get('info')

    if(this.loadProfile)
      this.load()
    
    if(this.copyProfile)
      this.copy()
  }

  load(){    
    this.id = this.info.id
    this.name = this.info.name

    this.status = this.info.status === 1 ? "Ativo" : "Inativo"
    this.ipAddress = this.info.endereco_ip
    this.url = this.info.url
    this.channel = this.info.canal
  } 

  copy(){
    this.load()
    this.name = this.name + " - Copia"
  }
  
  add(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present()     

    let status = this.status === "Ativo" ? 1 : 0
    
    this.httpd.addCamera(this.name, status, this.ipAddress, this.url, this.channel)
    .subscribe( () => {

      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {

        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('cameras-reload', 1);

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

    let status = this.status === "Ativo" ? 1 : 0
   
    this.httpd.saveCamera(this.id, this.name, status, this.ipAddress, this.url, this.channel)
    .subscribe( () => {

        loading.dismiss()
        this.uiUtils.showAlertSuccess()      
        this.navCtrl.pop()

        this.events.publish('cameras-reload', 1);
    })
  }

}
