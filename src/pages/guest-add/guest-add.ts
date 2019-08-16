import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { GuestTypes } from '../../types/guest.type';
import { CompaniesTypes } from '../../types/companies.types';
import { SectorTypes } from '../../types/sectors.types';
import { OfficeTypes } from '../../types/officies.types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-guest-add',
  templateUrl: 'guest-add.html',
})
export class GuestAddPage implements OnInit {

  employees: any = []
  employeeSelected: any
  autorizadoPor: string;
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
  
  public formGroup: FormGroup; 

  constructor(public navCtrl: NavController,     
    public httpd: HttpdProvider,
    public modalCtrl: ModalController,  
    public events: Events,
    public uiUtils: UiUtilsProvider,    
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

  initForm(){

    this.formGroup = this.formBuilder.group({   

      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      rg: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(14)]],
      cpf: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      endereco: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      district: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      tel:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      badge: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]],      
    });
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

    this.formGroup.setValue({
      name: this.informations.name,
      rg: this.informations.rg,
      cpf: this.informations.cpf,      
      endereco: this.informations.endereco,
      district: this.informations.bairro,
      tel: this.informations.telefone,
      badge: this.informations.CRACHA
      
    })
    
    this.autorizadoPor = this.informations.autorizadoPor
 
    this.employeeType = new GuestTypes(this.informations.id_tipo, this.informations.TIPO)
    this.employeeSector = new SectorTypes(this.informations.SETOR_ID, this.informations.SETOR)
    this.employeeCompany = new CompaniesTypes(this.informations.EMPRESA_ID, this.informations.EMPRESA)
    this.employeeOffice = new OfficeTypes(this.informations.CARGO_ID, this.informations.CARGO)        
  }

  clear(){
    this.formGroup.value.name = ""
    this.formGroup.value.rg = ""
    this.formGroup.value.endereco = ""    
    this.formGroup.value.cpf = ""
    this.formGroup.value.district = ""
    this.formGroup.value.tel = ""
    this.formGroup.value.badge = ""
    this.employeeFunction = ""
    this.employeeType = ""
    this.employeeSector = ""
    this.employeeCompany = ""
    this.employeeOffice = ""
  }

  verificaCracha(){
    return new Promise((resolve, reject) =>{

      this.httpd.verificaCracha(this.formGroup.value.badge)
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
    
    if(this.dataInfo.validacpf(this.formGroup.value.cpf)){

      if(this.formGroup.valid){

        let msg = "Confirmar novo visitante?"
  
        if(this.informations)
          msg = "Confirmar edição?"
  
        let alert = this.uiUtils.showConfirm("Atenção", msg)  
        alert.then((result) => {
  
        if(result)  
          this.verificaCracha()    
        })
      } else {
        this.uiUtils.showAlertError("Favor verificar inputs")
      }      
    }
    else {
      this.uiUtils.showAlertError("CPF inválido")
    }
        
  }

  addContinue(){

    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()

    this.httpd.addGuest(
      this.formGroup.value.name,
      this.formGroup.value.employeeSelected.id,
      this.formGroup.value.rg,
      this.formGroup.value.cpf,
      this.formGroup.value.district,
      this.formGroup.value.tel,
      "000",
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
        this.uiUtils.showAlertSuccess()        
        this.events.publish('search-guest:load', this.formGroup.value.name)
        this.clear()
        this.navCtrl.pop()
      })  
  }

  saveContinue(){

    return new Promise((resolve, reject) =>{

      let loading = this.uiUtils.showLoading("Favor aguarde")
      loading.present()

      this.httpd.editGuest(
      this.informations.id,
      this.formGroup.value.name,
      this.employeeSelected.id,
      this.formGroup.value.rg,
      this.formGroup.value.cpf,
      this.formGroup.value.district,
      this.formGroup.value.tel,
      "000",
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
        this.uiUtils.showAlertSuccess()        
        this.events.publish('search-guest:load', this.formGroup.value.name)
        this.clear()
        this.navCtrl.pop()
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
