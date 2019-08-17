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
  selector: 'page-offices',
  templateUrl: 'offices.html',
})
export class OfficesPage {

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
      
      this.events.subscribe('office-reload', () => {        
        this.get()
      });
  }
  
  ngOnDestroy() {    
    this.events.unsubscribe('office-reload');		
  }

  setFilteredItems(){    
    this.all = this.httpd.getOfficeByName(this.searchTerm)
  }

  get(){
    this.all = this.httpd.getOffices()    
    this.all.subscribe(data => {
        console.log(data)        
    })
  }

  showOptions(office) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(office)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(office)
          }
        },
       {
          text: this.dataInfo.titleRemove,
          handler: () => {
            this.remove(office)
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
    this.navCtrl.push('OfficesAddPage')
  }

  remove(office){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemove, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(office)
      }
    })    
  }

  removeContinue(office){
    console.log(office)
    
    this.httpd.delOffice(office).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.get()
        })
    })
  }

  edit(office){
    this.navCtrl.push('OfficesAddPage', {load: true, info: office})
  }

  copy(office){
    this.navCtrl.push('OfficesAddPage', {load: false, info: office, copy: true})
  }

}
