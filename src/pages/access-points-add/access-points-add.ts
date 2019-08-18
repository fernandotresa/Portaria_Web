import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-access-points-add',
  templateUrl: 'access-points-add.html',
})
export class AccessPointsAddPage {

  info: any
  id: number = 0
  name: string
  status: string
  apType: string    
  apCU: string
  ipAddress: string
  apCameras: any
  
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
    this.apType = this.info.id_tipo === 0 ? "Catraca" : "Cancela"    
    this.ipAddress = this.info.ip
    this.apCU = this.info.codigo === 0 ? "Entrada" : "Saída"

    this.loadCameras()  
  }

  loadCameras(){
    this.httpd.getCameraPonto(this.id)
    .subscribe( data => {
      this.loadCamerasCallback(data)
    })
  }

  loadCamerasCallback(data){
    this.apCameras = []

    data.success.forEach(element => {
      this.apCameras.push(element.name)
    });
  }

  copy(){
    this.load()
    this.name = this.name + " - Copia"
  }
  
  add(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present()     

    let status = this.status === "Ativo" ? 1 : 0
    let type = this.apType === "Catraca" ? 0 : 1
    let cu = this.apCU === "Entrada" ? 0 : 1
    
    console.log(this.id, this.name, status, cu, this.apCU, this.ipAddress, this.apCameras)

    this.httpd.addAccessPoint(this.name, status, type, cu, this.ipAddress, this.apCameras)
    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('access-points-reload', 1);

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
    let type = this.apType === "Catraca" ? 0 : 1
    let cu = this.apCU === "Entrada" ? 0 : 1

    console.log(this.id, this.name, status, type, cu, this.ipAddress, this.apCameras)

    this.httpd.saveAccessPoint(this.id, this.name, status, type, cu, this.ipAddress, this.apCameras)
    .subscribe( () => {

        loading.dismiss()
        this.uiUtils.showAlertSuccess()      
        this.navCtrl.pop()

        this.events.publish('access-points-reload', 1);
    })
  }
}
