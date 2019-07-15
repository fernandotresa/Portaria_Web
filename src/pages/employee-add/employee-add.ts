import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-employee-add',
  templateUrl: 'employee-add.html',
})
export class EmployeeAddPage {

  workFunctions: Observable<any>;
  employeeTypes: Observable<any>;
  sectors: Observable<any>;
  companies: Observable<any>;
  offices: Observable<any>;

  name: string;
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

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    this.startInterface()        
  }

  startInterface(){

    this.informations = this.navParams.get('informations')
    
    this.workFunctions = this.httpd.getWorkFunctions()
    this.workFunctions.subscribe(data => {        
      this.employeeFunction = data    
    })    

    this.employeeTypes = this.httpd.getEmployeeTypes()
    this.employeeTypes.subscribe(data => {
      this.employeeType = data
    })

    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe(data => {
      this.employeeSector = data      
    })

    this.companies = this.httpd.getCompanies()
    this.companies.subscribe(data => {
      this.employeeCompany = data      
    })

    this.offices = this.httpd.getOffices()
    this.offices.subscribe(data => {      
      this.employeeOffice = data      
    })

    if(this.informations)
      this.loadModel()
  }

  loadModel(){
    this.name = this.informations.name
    this.commumName = this.informations.name_comum
    this.rg = this.informations.rg
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
    this.commumName = ""
    this.rg = ""
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

  verificaInputs(){
    return true;
  }

  save(){
    if(this.verificaInputs()){

      let alert = this.uiUtils.showConfirm("Atenção", "Você tem certeza disso?")  
      alert.then((result) => {

      if(result)  
        this.update()    
       })
    }   
  }

  update(){

    if(this.verificaInputs()){

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
    this.employeeOffice)

    .subscribe( () =>{
      
        self.clear()
        loading.dismiss()
        self.uiUtils.showAlertSuccess()
      })
    }
  }


}
