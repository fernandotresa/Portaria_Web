import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profiles',
  templateUrl: 'profiles.html',
})
export class ProfilesPage {

  accessGroups: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  date: string;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });      
  }  

  ionViewDidLoad() {    
    this.getAccessGroups()
  }

  setFilteredItems(){
    this.accessGroups = this.httpd.getEmployeesByName(this.searchTerm)    
  }
  
  getAccessGroups(){

    this.accessGroups = this.httpd.getAccessGroups()
      this.accessGroups.subscribe(data => {
        console.log(data)
    })
  }

  goPermissionGroups(group){
    console.log(group)    
  }

  addPermissionGroups(){
    this.navCtrl.push('ProfilesAddPage')  
  }

  remove(group){
    
    console.log('remove', group)

    this.uiUtils.showConfirm("Remover Perfil", "Deseja realmente remover? A ação não poderá ser refeita.")
    .then(res => {
      if(res){
        this.removeContinue(group)
      }
    })    
  }

  removeContinue(group){
    this.httpd.delAccessGroups(group).subscribe(data => {
      this.uiUtils.showAlert("Sucesso", "Perfil removido com sucesso").present()
        .then( () => {        
          this.getAccessGroups()
        })
    })
  }

  edit(group){
    console.log('edit', group)
  }

  copy(group){
    console.log('copy', group)
  }

}
