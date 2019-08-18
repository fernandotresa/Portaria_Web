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
  selector: 'page-access-points',
  templateUrl: 'access-points.html',
})
export class AccessPointsPage {
  all: Observable<any>;
  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;

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
      
      this.events.subscribe('access-points-reload', () => {        
        this.get()
      });

      this.get()
  }
  
  ngOnDestroy() {    
    this.events.unsubscribe('access-points-reload');		
  }

  setFilteredItems(){    
    this.all = this.httpd.getAccessPointsByName(this.searchTerm)
  }

  get(){
    this.all = this.dataInfo.accessPoints
  }

  showOptions(ap) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(ap)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(ap)
          }
        },
       {
          text: this.dataInfo.titleRemove,
          handler: () => {
            this.remove(ap)
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
/*  */
  add(){
    this.navCtrl.push('AccessPointsAddPage')
  }

  remove(ap){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemove, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(ap)
      }
    })    
  }

  removeContinue(ap){
    this.httpd.delAccessPoints(ap).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.get()
        })
    })
  }

  edit(ap){
    this.navCtrl.push('AccessPointsAddPage', {load: true, info: ap})
  }

  copy(ap){
    this.navCtrl.push('AccessPointsAddPage', {load: false, info: ap, copy: true})
  }
  
}
