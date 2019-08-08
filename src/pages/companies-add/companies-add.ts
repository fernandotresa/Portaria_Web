import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-companies-add',
  templateUrl: 'companies-add.html',
})
export class CompaniesAddPage {

  info: any
  id: number = 0
  name: string
  responsavel: string
  endereco: string
  bairro: string
  cnpj: string
  tel: string
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

    if(this.load)
      this.load()
    
    else if(this.copyProfile)
      this.copy()
  }

  load(){
      this.id = this.info.id
      this.name = this.info.name
      this.responsavel = this.info.responsavel
      this.endereco = this.info.endereco
      this.bairro = this.info.bairro
      this.cnpj = this.info.cnpj
      this.tel = this.info.tel
      this.status = this.info.status      
  }

  copy(){
    this.load()
    this.name = this.name + " - Copia"
    this.responsavel = this.responsavel + " - Copia"
    this.endereco = this.endereco + " - Copia"
    this.bairro = this.bairro + " - Copia"
    this.cnpj = this.cnpj + " - Copia"    
  }
  
  add(){
    let loading = this.uiUtils.showLoading(this.dataInfo.pleaseWait)    
    loading.present()     

    this.httpd.addCompany(this.name, this.responsavel, this.endereco, this.bairro, this.cnpj, this.tel, this.status)
    .subscribe( () => {
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleSuccess).present()
      .then( () => {
        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('companies-reload', 1);

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

    this.httpd.saveCompany(this.id, this.name, this.responsavel, this.endereco, this.bairro, this.cnpj, this.tel, this.status)
    .subscribe( () => {

        loading.dismiss()
        this.uiUtils.showAlertSuccess()      
        this.navCtrl.pop()
        this.events.publish('companies-reload', 1);
    })
  }

  

}
