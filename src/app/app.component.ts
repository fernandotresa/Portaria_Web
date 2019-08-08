import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CompaniesPage } from '../pages/companies/companies';
import { OfficesPage } from '../pages/offices/offices';
import { SectorsPage } from '../pages/sectors/sectors';
import { UsersPage } from '../pages/users/users';
import { BadgesPage } from '../pages/badges/badges';
import { CamerasPage } from '../pages/cameras/cameras';
import { AccessPointsPage } from '../pages/access-points/access-points';

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
			iconName: 'home',
			displayText: 'Início',			
			custom: {
				isHome: true
			}
		});				
		
		this.options.push({
			displayText: 'Cadastros',
			suboptions: [								
			{
				iconName: 'briefcase',
				displayText: 'Colaboradores',
				component: 'EmployeePage'			
			},
			{
				iconName: 'people',
				displayText: 'Visitantes',
				component: 'GuestPage'
			},
			{
				iconName: 'folder-open',
				displayText: 'Empresas',
				component: CompaniesPage
			},
			{
				iconName: 'unlock',
				displayText: 'Cargos',
				component: OfficesPage
			},		
			{
				iconName: 'ios-bug',
				displayText: 'Setores',
				component: SectorsPage							
			}
		   ]
		});	 
		this.options.push({
			displayText: 'Acessos e permissões',
			suboptions: [
				{
					iconName: 'folder-open',
					displayText: 'Lista de controle',
					component: 'AclsPage'
				},
				{
					iconName: 'unlock',
					displayText: 'Perfis de Acessos',
					component: 'ProfilesPage'
				}
			]
		});	 
		this.options.push({
			displayText: 'Administrativo',
			suboptions: [
				{
					iconName: 'ios-bug',
					displayText: 'Usuários',
					component: UsersPage,
				},
				{
					iconName: 'unlock',
					displayText: 'Pontos de acesso',
					component: AccessPointsPage
				},
				{
					iconName: 'unlock',
					displayText: 'Crachás',
					component: BadgesPage
				},
				{
					iconName: 'unlock',
					displayText: 'Monitoramento',
					component: CamerasPage
				}
			]
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


