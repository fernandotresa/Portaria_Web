import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events, ActionSheetController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-companies',
  templateUrl: 'companies.html',
})
export class CompaniesPage {

  all: Observable<any>;

  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

  date: string;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public actionSheetCtrl: ActionSheetController,
    public events: Events,
    public navParams: NavParams) {

      this.searchControl = new FormControl();

      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
      });  
      
      this.events.subscribe('companies-reload', () => {        
        this.get()
      });
  }

  ionViewDidLoad() {     
  }

  ngOnDestroy() {    
    this.events.unsubscribe('companies-reload');		
  }

  setFilteredItems(){    
    this.all = this.httpd.getCompaniesByName(this.searchTerm)
  }

  get(){
    this.all = this.httpd.getCompanies()    
    this.all.subscribe(data => {
        console.log(data)        
    })
  }

  showOptions(company) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(company)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(company)
          }
        },
       {
          text: this.dataInfo.titleRemoveProfile,
          handler: () => {
            this.remove(company)
          }
        },{
          text: this.dataInfo.titleCancel,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  add(){
    this.navCtrl.push('CompaniesAddPage', {load: false, copy: false})
  }

  remove(acl){    
    this.uiUtils.showConfirm(this.dataInfo.titleRemoveProfile, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(acl)
      }
    })    
  }

  removeContinue(acl){
    this.httpd.delCompany(acl).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.get()
        })
    })
  }

  edit(company){
    this.navCtrl.push('CompaniesAddPage', {load: true, info: company})
  }

  copy(company){
    this.navCtrl.push('CompaniesAddPage', {load: false, info: company, copy: true})
  }

}
