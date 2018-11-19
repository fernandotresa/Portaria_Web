import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { LoginPageModule } from '../pages/login/login.module';

import { HttpdProvider } from '../providers/httpd/httpd';
import { DataInfoProvider } from '../providers/data-info/data-info';
import { UiUtilsProvider } from '../providers/ui-utils/ui-utils';
import { AuthProvider } from '../providers/auth/auth';

import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SideMenuContentComponent    
  ],
  imports: [
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
    LoginPageModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpdProvider,
    DataInfoProvider,
    UiUtilsProvider,
    AuthProvider
  ]
})

export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
