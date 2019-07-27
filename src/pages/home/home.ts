import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { EmployeePage } from '../../pages/employee/employee';
import { GuestPage } from '../../pages/guest/guest';
import { ProfilesPage } from '../../pages/profiles/profiles';
import { HttpdProvider } from '../../providers/httpd/httpd';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  

  initializing: Boolean = true

  constructor(public navCtrl: NavController,
    public httpd: HttpdProvider, 
    public dataInfo: DataInfoProvider,    
    public uiUtils: UiUtilsProvider) {

      this.initializing = true
      this.loadData()
  }

  loadData(){

    let loading = this.uiUtils.showLoading("Carregando informações básicas. Favor aguarde")
    loading.present()

    this.dataInfo.workFunctions = this.httpd.getWorkFunctions()
    this.dataInfo.workFunctions.subscribe(data => {  

      this.dataInfo.employeeFunction = data    

      this.dataInfo.employeeTypes = this.httpd.getEmployeeTypes()
      this.dataInfo.employeeTypes.subscribe(data => {
        this.dataInfo.employeeType = data

        this.dataInfo.sectors = this.httpd.getSectors()
          this.dataInfo.sectors.subscribe(data => {
            this.dataInfo.employeeSector = data      

            this.dataInfo.companies = this.httpd.getCompanies()
            this.dataInfo.companies.subscribe(data => {
              this.dataInfo.employeeCompany = data      

              this.dataInfo.offices = this.httpd.getOffices()
              this.dataInfo.offices.subscribe(data => {  

                this.dataInfo.employeeOffice = data   

                this.dataInfo.guestTypes = this.httpd.getGuestTypes()
                this.dataInfo.guestTypes.subscribe(data => {  

                  this.dataInfo.guestType = data   
                  loading.dismiss()
                  this.loadVehiclesInfo()
                })

              })
            })
          })          
      })      
    })
  }

  loadVehiclesInfo(){

    let loading = this.uiUtils.showLoading("Carregando informações de veículos. Favor aguarde")
    loading.present()

    this.dataInfo.vehicleTypes = this.httpd.getVehicleTypes()
    this.dataInfo.vehicleTypes.subscribe(data => { 
      
      this.dataInfo.vehicleType = data

        this.dataInfo.vehicleModels = this.httpd.getVehicleModels()
          this.dataInfo.vehicleModels.subscribe(data => {
            this.dataInfo.vehicleModel = data      

            this.dataInfo.vehicleBrands = this.httpd.getVehicleBrands()
            this.dataInfo.vehicleBrands.subscribe(data => {
              this.dataInfo.vehicleBrand = data

              loading.dismiss()
              this.uiUtils.showToast("Seja bem Vindo " + this.dataInfo.userInfo.name  )
            });
        });
    });
  }

  goPageEmployee(){
    this.navCtrl.push(EmployeePage)
  }

  goPageGuests(){
    this.navCtrl.push(GuestPage)
  }

  goPagePermissions(){
    this.navCtrl.push(ProfilesPage)
  }

}
