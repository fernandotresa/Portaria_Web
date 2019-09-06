import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdministratorPageModule } from '../pages/administrator/administrator.module';
import { CompaniesPageModule } from '../pages/companies/companies.module';
import { CompaniesAddPageModule } from '../pages/companies-add/companies-add.module';
import { OfficesPageModule } from '../pages/offices/offices.module';
import { OfficesAddPageModule } from '../pages/offices-add/offices-add.module';
import { SectorsPageModule } from '../pages/sectors/sectors.module';
import { SectorsAddPageModule } from '../pages/sectors-add/sectors-add.module';
import { LoginPageModule } from '../pages/login/login.module';
import { EmployeePageModule } from '../pages/employee/employee.module';
import { EmployeeAddPageModule } from '../pages/employee-add/employee-add.module';
import { GuestPageModule } from '../pages/guest/guest.module';
import { ReceptorPageModule } from '../pages/receptor/receptor.module';
import { GatekeeperPageModule } from '../pages/gatekeeper/gatekeeper.module';
import { GuestAddPageModule } from '../pages/guest-add/guest-add.module';
import { ProfilesPageModule } from '../pages/profiles/profiles.module';
import { MonitorsPageModule } from '../pages/monitors/monitors.module';
import { ProfilesAddPageModule } from '../pages/profiles-add/profiles-add.module';
import { ProfilesLinkPageModule } from '../pages/profiles-link/profiles-link.module';
import { UsersPageModule } from '../pages/users/users.module';
import { VehiclePageModule } from '../pages/vehicle/vehicle.module';
import { VehicleAddPageModule } from '../pages/vehicle-add/vehicle-add.module';
import { AclsPageModule } from '../pages/acls/acls.module';
import { AclsAddPageModule } from '../pages/acls-add/acls-add.module';

import { AccessPointsPageModule } from '../pages/access-points/access-points.module';
import { AccessPointsAddPageModule } from '../pages/access-points-add/access-points-add.module';
import { BadgesPageModule } from '../pages/badges/badges.module';
import { BadgesAddPageModule } from '../pages/badges-add/badges-add.module';
import { CamerasPageModule } from '../pages/cameras/cameras.module';
import { CamerasAddPageModule } from '../pages/cameras-add/cameras-add.module';
import { ImportsPageModule } from '../pages/imports/imports.module';
import { SystemsPageModule } from '../pages/systems/systems.module';
import { ReportsPageModule } from '../pages/reports/reports.module';

import { HttpdProvider } from '../providers/httpd/httpd';
import { DataInfoProvider } from '../providers/data-info/data-info';
import { UiUtilsProvider } from '../providers/ui-utils/ui-utils';
import { AuthProvider } from '../providers/auth/auth';

import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MomentsProvider } from '../providers/moments/moments';
import { DatetimeUtilsProvider } from '../providers/datetime-utils/datetime-utils';
import { ExpireUtilsProvider } from '../providers/expire-utils/expire-utils';
import { DayweekUtilsProvider } from '../providers/dayweek-utils/dayweek-utils';
import { VacationUtilsProvider } from '../providers/vacation-utils/vacation-utils';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  declarations: [
    MyApp,
    HomePage,   
    SideMenuContentComponent    
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()    
    ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],

  exports: [
    AdministratorPageModule,
    LoginPageModule,
    EmployeePageModule,
    GuestPageModule,
    ProfilesPageModule,
    ProfilesAddPageModule,
    EmployeeAddPageModule,
    ProfilesLinkPageModule,
    UsersPageModule,
    AclsPageModule,
    AclsAddPageModule,
    GuestAddPageModule,
    VehicleAddPageModule,
    VehiclePageModule,
    SectorsAddPageModule,
    SectorsPageModule,
    OfficesPageModule,
    OfficesAddPageModule,
    CompaniesPageModule,
    CompaniesAddPageModule,
    AccessPointsPageModule,
    AccessPointsAddPageModule,
    BadgesPageModule,
    BadgesAddPageModule,
    CamerasPageModule,
    CamerasAddPageModule,
    ImportsPageModule,
    SystemsPageModule,
    ReceptorPageModule,
    GatekeeperPageModule,
    MonitorsPageModule,
    ReportsPageModule

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpdProvider,
    DataInfoProvider,
    UiUtilsProvider,
    AuthProvider,
    MomentsProvider,
    DatetimeUtilsProvider,
    ExpireUtilsProvider,
    DayweekUtilsProvider,
    VacationUtilsProvider,
    InAppBrowser
  ]
})

export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
