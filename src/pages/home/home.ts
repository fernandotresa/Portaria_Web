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

  constructor(public navCtrl: NavController,
    public httpd: HttpdProvider, 
    public dataInfo: DataInfoProvider,    
    public uiUtils: UiUtilsProvider) {

      this.loadData()
  }

  loadData(){

    let loading = this.uiUtils.showLoading("Favor aguarde")
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
                })

              })
            })
          })          
      })      
    })
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
