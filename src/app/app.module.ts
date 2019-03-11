import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPageModule } from '../pages/login/login.module';
import { EmployeePageModule } from '../pages/employee/employee.module';
import { EmployeeAddPageModule } from '../pages/employee-add/employee-add.module';
import { GuestPageModule } from '../pages/guest/guest.module';
import { ProfilesPageModule } from '../pages/profiles/profiles.module';
import { ProfilesAddPageModule } from '../pages/profiles-add/profiles-add.module';
import { ProfilesLinkPageModule } from '../pages/profiles-link/profiles-link.module';
import { UsersPageModule } from '../pages/users/users.module';
import { AclsPageModule } from '../pages/acls/acls.module';
import { AclsAddPageModule } from '../pages/acls-add/acls-add.module';

import { HttpdProvider } from '../providers/httpd/httpd';
import { DataInfoProvider } from '../providers/data-info/data-info';
import { UiUtilsProvider } from '../providers/ui-utils/ui-utils';
import { AuthProvider } from '../providers/auth/auth';

import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';
import { NgCalendarModule  } from 'ionic2-calendar';
import { MomentsProvider } from '../providers/moments/moments';

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
    HomePage
  ],

  exports: [
    LoginPageModule,
    EmployeePageModule,
    GuestPageModule,
    ProfilesPageModule,
    ProfilesAddPageModule,
    EmployeeAddPageModule,
    ProfilesLinkPageModule,
    UsersPageModule,
    AclsPageModule,
    AclsAddPageModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpdProvider,
    DataInfoProvider,
    UiUtilsProvider,
    AuthProvider,
    MomentsProvider
  ]
})

export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
