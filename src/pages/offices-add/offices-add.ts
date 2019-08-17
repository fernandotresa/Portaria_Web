import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-offices-add',
  templateUrl: 'offices-add.html',
})
export class OfficesAddPage {

  info: any
  id: number = 0
  name: string
  obs: string  
  status: string
  
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
    
    else if(this.copyProfile)
      this.copy()
  }

  load(){
      console.log(this.info)

      this.id = this.info.id
      this.name = this.info.name
      this.status = this.info.status === 1 ? "Ativo" : "Inativo"
  }

  copy(){
    this.load()
    this.name = this.name + " - Copia"
    this.status = this.info.status === 1 ? "Ativo" : "Inativo"
  }
  
  add(){

    let msg = "Confirmar adição?"
  
    let alert = this.uiUtils.showConfirm("Atenção", msg)  
    alert.then((result) => {

    if(result)  
      this.addContinue()    
    })       
  }

  addContinue(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present()     

    this.httpd.addOffice(this.name, this.obs, this.status)

    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('office-reload', 1);

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


    this.httpd.saveOffice(this.id, this.name, this.obs, this.status)
    .subscribe( () => {

        loading.dismiss()
        this.uiUtils.showAlertSuccess()      
        this.navCtrl.pop()

        this.events.publish('office-reload', 1);
    })
  }


}
