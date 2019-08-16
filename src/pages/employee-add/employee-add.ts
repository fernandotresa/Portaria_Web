import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { VehicleAddPage } from '../../pages/vehicle-add/vehicle-add';
import { EmployeeTypes } from '../../types/employee.type';
import { FunctionsTypes } from '../../types/functions.types';
import { CompaniesTypes } from '../../types/companies.types';
import { SectorTypes } from '../../types/sectors.types';
import { OfficeTypes } from '../../types/officies.types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage implements OnInit {  

  employeeType: any;
  employeeFunction: any;
  employeeSector: any;
  employeeCompany: any;
  employeeOffice: any;
  employeeAccessPoints: any;

  informations: any;
  vehicles: any = []

  employeeTypes: EmployeeTypes[];
  functionTypes: FunctionsTypes[];
  companiesTypes: CompaniesTypes[];
  sectorsTypes: SectorTypes[];
  officesTypes: OfficeTypes[];
  accessPointsTypes: any;

  public formGroup: FormGroup; 

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider,
    public events: Events,
    public uiUtils: UiUtilsProvider,
    public modalCtrl: ModalController, 
    public dataInfo: DataInfoProvider,
    private formBuilder: FormBuilder,
    public navParams: NavParams) {
      
  }

  ionViewDidLoad() {    
    this.startInterface()        
  }

  ngOnInit() {
    this.initForm()
  }

  startInterface(){

    this.populateEmployeeType()
    this.populateFunctionType()
    this.populateSectorsType()
    this.populateCompaniesType()
    this.populateOfficesType()
    this.populateAccessPoints()

    this.clear()
    this.informations = this.navParams.get('informations')

    if(this.informations)
        this.loadModel()                                
  }


  initForm(){

    this.formGroup = this.formBuilder.group({   

      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      commumName: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      rg: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(14)]],
      cpf: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      endereco: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      district: ['',[Validators.required, Validators.minLength(3), Validators.minLength(40)]],
      tel:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      ramal: ['',[Validators.minLength(11), Validators.maxLength(11)]],
      registration: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      badge: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]],      
    });
  }
  
  loadModel(){

    this.formGroup.setValue({
      name: this.informations.name,
      commumName: this.informations.name_comum,
      rg: this.informations.rg,
      cpf: this.informations.cpf,      
      endereco: this.informations.endereco,
      district: this.informations.bairro,
      tel: this.informations.telefone,
      ramal: this.informations.ramal,
      registration: this.informations.matricula,
      badge: this.informations.CRACHA
      
    })

    this.employeeFunction = new FunctionsTypes(this.informations.FUNCAO_ID, this.informations.FUNCAO)
    this.employeeType = new EmployeeTypes(this.informations.id_tipo, this.informations.FUNCIONARIO_TIPO)
    this.employeeSector = new SectorTypes(this.informations.SETOR_ID, this.informations.SETOR)
    this.employeeCompany = new CompaniesTypes(this.informations.EMPRESA_ID, this.informations.EMPRESA)
    this.employeeOffice = new OfficeTypes(this.informations.CARGO_ID, this.informations.CARGO)     
    this.employeeAccessPoints = this.informations.accessPoints   
        
    this.getVehicle()    
  }

  populateEmployeeType(){
    this.employeeTypes = []
    
    this.dataInfo.employeeType.success.forEach(element => {            
      this.employeeTypes.push(new EmployeeTypes(element.id, element.name))
    });
  }

  populateFunctionType(){
    this.functionTypes = []
        
    this.dataInfo.employeeFunction.success.forEach(element => {            
      this.functionTypes.push(new FunctionsTypes(element.id, element.name))
    });
  }

  populateSectorsType(){
    this.sectorsTypes = []
        
    this.dataInfo.employeeSector.success.forEach(element => {            
      this.sectorsTypes.push(new SectorTypes(element.id, element.name))
    });
  }

  populateOfficesType(){
    this.officesTypes = []
        
    this.dataInfo.employeeFunction.success.forEach(element => {            
      this.officesTypes.push(new OfficeTypes(element.id, element.name))
    });
  };

  populateCompaniesType(){
    this.companiesTypes = []
        
    this.dataInfo.employeeCompany.success.forEach(element => {            
      this.companiesTypes.push(new CompaniesTypes(element.id, element.name))
    });
  }

  populateAccessPoints(){
    this.accessPointsTypes = []
        
    this.dataInfo.accessPoint.success.forEach(element => {            
      this.accessPointsTypes.push(element.name)
    });
  }

  clear(){
    this.formGroup.value.name = ""
    this.formGroup.value.commumName = ""
    this.formGroup.value.rg = ""
    this.formGroup.value.endereco = ""    
    this.formGroup.value.cpf = ""
    this.formGroup.value.district = ""
    this.formGroup.value.tel = ""
    this.formGroup.value.ramal = ""
    this.formGroup.value.registration = ""
    this.formGroup.value.badge = ""
    this.employeeFunction = ""
    this.employeeType = ""
    this.employeeSector = ""
    this.employeeCompany = ""
    this.employeeOffice = ""
    this.employeeAccessPoints = ""
  }

  verificaCracha(){

    return new Promise((resolve, reject) =>{
      this.httpd.verificaCracha(this.formGroup.value.badge)
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

    this.httpd.addEmployee(
    this.formGroup.value.name,
    this.formGroup.value.commumName,
    this.formGroup.value.rg,
    this.formGroup.value.cpf,
    this.formGroup.value.district,
    this.formGroup.value.tel,
    this.formGroup.value.ramal,
    this.formGroup.value.registration,
    this.formGroup.value.badge,
    this.employeeFunction.name,
    this.employeeType.name,
    this.employeeSector.name,
    this.employeeCompany.name,
    this.employeeOffice.name,
    this.formGroup.value.endereco)

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
    this.formGroup.value.name,
    this.formGroup.value.commumName,
    this.formGroup.value.rg,
    this.formGroup.value.cpf,
    this.formGroup.value.district,
    this.formGroup.value.tel,
    this.formGroup.value.ramal,
    this.formGroup.value.registration,
    this.formGroup.value.badge,
    this.employeeFunction.name,
    this.employeeType.name,
    this.employeeSector.name,
    this.employeeCompany.name,
    this.employeeOffice.name,
    this.formGroup.value.endereco)

    .subscribe( () =>{
        loading.dismiss()
        this.finishSave()     
      })
   }   

   finishSave(){
    this.saveAccessPoints()
    this.saveVehicles()            
    this.uiUtils.showAlertSuccess()        
    this.events.publish('search-employee:load', self.name)
    this.clear()
    this.navCtrl.pop()        
   }

   saveAccessPoints(){

    if(this.employeeAccessPoints.length > 0){

      this.httpd.addAccessPointsEmployee(this.employeeAccessPoints, this.formGroup.value.badge) 
        .subscribe( () => {
          console.log("Pontos de acesso salvos", this.employeeAccessPoints, this.formGroup.value.badge)
        })
    }
   }

   saveVehicles(){
    if(this.vehicles.length > 0){
      this.httpd.addVehicle(this.vehicles) 
      .subscribe( () => {
          console.log("Veiculos salvos", this.vehicles)        
      })
    }
   }

   getVehicle(){
    let loading = this.uiUtils.showLoading("Carregando informações de veículos. Favor aguarde")
    loading.present()

    this.httpd.getVehicleByEmployeeId(this.informations.id)
    .subscribe( data => {
      
      loading.dismiss()
      this.getVehicleCallback(data)
    })    
   }

   getVehicleCallback(data){    

    this.vehicles = []

    data.success.forEach(element => {          
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

