import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'

import { SelectSearchableComponent } from 'ionic-select-searchable';
import { GuestTypes } from '../../types/guest.type';
import { CompaniesTypes } from '../../types/companies.types';
import { SectorTypes } from '../../types/sectors.types';
import { OfficeTypes } from '../../types/officies.types';


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


  guestTypes: GuestTypes[];
  companiesTypes: CompaniesTypes[];
  sectorsTypes: SectorTypes[];
  officesTypes: OfficeTypes[];
  

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

    this.populateEmployeeType()
    this.populateSectorsType()
    this.populateCompaniesType()
    this.populateOfficesType()

    if(this.informations)
        this.loadModel()                                
  }

  populateEmployeeType(){
    this.guestTypes = []
    
    this.dataInfo.guestType.success.forEach(element => {            
      this.guestTypes.push(new GuestTypes(element.id, element.name))
    });
  }

  populateOfficesType(){
    this.officesTypes = []
        
    this.dataInfo.employeeFunction.success.forEach(element => {            
      this.officesTypes.push(new OfficeTypes(element.id, element.name))
    });
  };

  populateSectorsType(){
    this.sectorsTypes = []
        
    this.dataInfo.employeeSector.success.forEach(element => {            
      this.sectorsTypes.push(new SectorTypes(element.id, element.name))
    });
  }  

  populateCompaniesType(){
    this.companiesTypes = []
        
    this.dataInfo.employeeCompany.success.forEach(element => {            
      this.companiesTypes.push(new CompaniesTypes(element.id, element.name))
    });
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
        
    console.log(this.informations.TIPO)
    
    this.employeeType = new GuestTypes(this.informations.id_tipo, this.informations.TIPO)
    this.employeeSector = new SectorTypes(this.informations.SETOR_ID, this.informations.SETOR)
    this.employeeCompany = new CompaniesTypes(this.informations.EMPRESA_ID, this.informations.EMPRESA)
    this.employeeOffice = new OfficeTypes(this.informations.CARGO_ID, this.informations.CARGO)        
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
          resolve(true)

        });
      })
  }

  checkInputs(): Boolean {             

    console.log(this.employeeSelected)
    
    if(! this.employeeSelected ){
      this.uiUtils.showAlertError("Falha ao salvar. Autorizante não informado.")
      return false
    }



    return true;
  }

  verificaCrachaContinue(data){
    console.log(data.success)

    return new Promise((resolve, reject) =>{

      if(data.success.length > 0){

        if(this.checkInputs()){

          if(! this.informations)
            this.addContinue()
          else
            this.saveContinue()

          resolve()

        } else {          
          reject()  
        }
        
      }
      else {
        this.uiUtils.showAlertError("Crachá não localizado")
        reject()
      }

    });    
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
    this.employeeFunction.name,
    this.employeeType.name,
    this.employeeSector.name,
    this.employeeCompany.name,
    this.employeeOffice.name,
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

    console.log(this.employeeSelected)

    return new Promise((resolve, reject) =>{

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
      this.employeeFunction.name,
      this.employeeType.name,
      this.employeeSector.name,
      this.employeeCompany.name,
      this.employeeOffice.name,
      this.endereco)

    .subscribe( () =>{
      
        loading.dismiss()
        self.uiUtils.showAlertSuccess()        
        self.events.publish('search-guest:load', self.name)
        self.clear()
        self.navCtrl.pop()
        resolve()

      })

    });

    
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
