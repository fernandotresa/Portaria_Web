import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { VehicleAddPage } from '../../pages/vehicle-add/vehicle-add';

@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage {  

  id: number = 0
  name: string;
  endereco: string;
  commumName: string;
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
  vehicles: any = []

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider,
    public events: Events,
    public uiUtils: UiUtilsProvider,
    public modalCtrl: ModalController, 
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
    this.id = this.informations.id
    this.name = this.informations.name
    this.commumName = this.informations.name_comum
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
    
    this.getVehicle()
  }

  clear(){
    this.name = ""
    this.commumName = ""
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
          resolve()     
        });
      })
  }

  verificaCrachaContinue(data){

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

    this.httpd.addEmployee(this.name,
    this.commumName,
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
        this.finishSave()
      })  
  }

  saveContinue(){

    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()

    this.httpd.editEmployee(
    this.informations.id,
    this.name,
    this.commumName,
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
        this.finishSave()     
      })
   }   

   finishSave(){

    if(this.vehicles.length > 0){
      this.httpd.addVehicle(this.vehicles) 
      .subscribe( () => {
          console.log("Veiculos salvos", this.vehicles)        
      })
    }
        
    this.uiUtils.showAlertSuccess()        
    this.events.publish('search-employee:load', self.name)
    this.clear()
    this.navCtrl.pop()    
   }

   getVehicle(){
    let loading = this.uiUtils.showLoading("Carregando informações de veículos. Favor aguarde")
    loading.present()

    this.httpd.getVehicleByEmployeeId(this.id)
    .subscribe( data => {
      
      loading.dismiss()
      this.getVehicleCallback(data)
    })    
   }

   getVehicleCallback(data){    

    this.vehicles = []

    data.success.forEach(element => {
    
      console.log(element)
      this.vehicles.push(element)

    });

   }

   addVehicle(){

    let modal = this.modalCtrl.create(VehicleAddPage, { vehicles: this.vehicles });
    modal.present();
    modal.onDidDismiss(data => {
      
      if (data){
        this.vehicles = data
      }              
    });
  }

}
