import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

@IonicPage()
@Component({
  selector: 'page-guest-add',
  templateUrl: 'guest-add.html',
})
export class GuestAddPage {

  employees: any = []
  employeeSelected: any

  name: string;
  endereco: string;
  autorizadoPor: string;
  rg: string;
  cpf: string;
  district: string;
  tel: string;
  ramal: string;
  registration: string;
  badge: string;
  employeeType: any;
  employeeFunction: any;
  employeeSector: any;
  employeeCompany: any;
  employeeOffice: any;

  informations: any;

  constructor(public navCtrl: NavController,     
    public httpd: HttpdProvider,
    public modalCtrl: ModalController,  
    public events: Events,
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {    
    this.startInterface()        
  }

  startInterface(){

    this.clear()
    this.informations = this.navParams.get('informations')

    if(this.informations)
        this.loadModel()                                
  }

  loadModel(){
    this.name = this.informations.name
    this.autorizadoPor = this.informations.autorizadoPor
    this.rg = this.informations.rg
    this.endereco = this.informations.endereco
    this.cpf = this.informations.cpf
    this.district = this.informations.bairro
    this.tel = this.informations.telefone
    this.ramal = this.informations.ramal
    this.registration = this.informations.matricula
    this.badge = this.informations.CRACHA  
    this.employeeFunction = this.informations.FUNCAO
    this.employeeType = this.informations.FUNCIONARIO_TIPO
    this.employeeSector = this.informations.SETOR
    this.employeeCompany = this.informations.EMPRESA
    this.employeeOffice = this.informations.CARGO      
  }

  clear(){
    this.name = ""
    this.autorizadoPor = ""
    this.rg = ""
    this.endereco = ""    
    this.cpf = ""
    this.district = ""
    this.tel = ""
    this.ramal = ""
    this.registration = ""
    this.badge = ""
    this.employeeFunction = ""
    this.employeeType = ""
    this.employeeSector = ""
    this.employeeCompany = ""
    this.employeeOffice = ""
  }

  verificaCracha(){
    return new Promise((resolve, reject) =>{
      this.httpd.verificaCracha(this.badge)
      .subscribe( data => {
          this.verificaCrachaContinue(data)        
        });
      })
  }

  verificaCrachaContinue(data){
    console.log(data.success)

    if(data.success.length > 0){

      if(! this.informations)
        this.addContinue()
      else
        this.saveContinue()
      }
  }      

  add(){    
    let alert = this.uiUtils.showConfirm("Atenção", "Você tem certeza disso?")  
    alert.then((result) => {

    if(result)  
      this.verificaCracha()    
    })
  }

  addContinue(){

    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()

    let self = this   

    this.httpd.addGuest(this.name,
    this.employeeSelected.id,
    this.rg,
    this.cpf,
    this.district,
    this.tel,
    this.ramal,
    this.registration,
    this.badge,
    this.employeeFunction,
    this.employeeType,
    this.employeeSector,
    this.employeeCompany,
    this.employeeOffice,
    this.endereco)

    .subscribe( () =>{
              
        loading.dismiss()
        self.uiUtils.showAlertSuccess()        
        self.events.publish('search-guest:load', self.name)
        self.clear()
        self.navCtrl.pop()
      })  
  }

  saveContinue(){

    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()

    let self = this   

    this.httpd.editGuest(
    this.informations.id,
    this.name,
    this.employeeSelected.id,
    this.rg,
    this.cpf,
    this.district,
    this.tel,
    this.ramal,
    this.registration,
    this.badge,
    this.employeeFunction,
    this.employeeType,
    this.employeeSector,
    this.employeeCompany,
    this.employeeOffice,
    this.endereco)

    .subscribe( () =>{
      
        loading.dismiss()
        self.uiUtils.showAlertSuccess()        
        self.events.publish('search-guest:load', self.name)
        self.clear()
        self.navCtrl.pop()
      })
   }

   searchAuthorizedBy(){
     
     this.httpd.getUserByName(this.autorizadoPor)
     .subscribe( data => {
        this.searchAuthorizedByCallback(data)       
     })
   }

   searchAuthorizedByCallback(data){
    
    this.employees = []
    data.success.forEach(element => {
      this.employees.push(element)
    });
   }

   addAuthorizedBy(employee){
     this.employeeSelected = employee
     this.autorizadoPor = employee.name
     this.employees = []

   }

}
