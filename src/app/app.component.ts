import { Component, ViewChild } from '@angular/core';
import { Config, Nav, Platform, MenuController, AlertController } from 'ionic-angular';
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { EmployeePage } from '../pages/employee/employee';
import { GuestPage } from '../pages/guest/guest';
import { ProfilesPage } from '../pages/profiles/profiles';
import { ProfilesAddPage } from '../pages/profiles-add/profiles-add';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  rootPage:any = LoginPage;

  public options: Array<SideMenuOption>;

	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option'		
  };

  constructor(platform: Platform, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      
      this.initializeOptions()
      
    });
  }

  public onOptionSelected(option: SideMenuOption): void {
		this.menuCtrl.close().then(() => {

			if (option.custom && option.custom.isLogin) {
				console.log('You\'ve clicked the login option!');


			} else if (option.custom && option.custom.isLogout) {

				console.log('You\'ve clicked the logout option!');
				this.nav.setRoot(LoginPage, { autoLogin: false })

			} else if (option.custom && option.custom.isHome) {
				this.nav.setRoot(HomePage)

			}  else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');

			} else {
				
				const params = option.custom && option.custom.param;
				this.nav.push(option.component, params);
					
			}
		});
	}

	public collapseMenuOptions(): void {
		this.sideMenu.collapseAllOptions();
	}

  private initializeOptions(): void {

    this.options = new Array<SideMenuOption>();
    
		this.options.push({
			iconName: 'map',
			displayText: 'Início',			
			custom: {
				isHome: true
			}			
		});								
		
		this.options.push({
			iconName: 'md-person-add',
			displayText: 'Perfil',
			component: HomePage			
		});						

		this.options.push({
			iconName: 'contacts',
			displayText: 'Colaboradores',
			component: EmployeePage			
		});

		this.options.push({
			iconName: 'people',
			displayText: 'Visitantes',
			component: GuestPage
		});	
  
    this.options.push({
			iconName: 'unlock',
			displayText: 'Acessos',
			component: ProfilesPage
		});	
    
		this.options.push({
			iconName: 'log-out',
			displayText: 'Sair',
			custom: {
				isLogout: true
			}			
		});
	}	
}


