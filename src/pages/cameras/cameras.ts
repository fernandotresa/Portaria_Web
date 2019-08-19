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
  selector: 'page-cameras',
  templateUrl: 'cameras.html',
})
export class CamerasPage {

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
      
      this.events.subscribe('cameras-reload', () => {        
        this.get()
      });
  }

  ionViewDidLoad() {  
    this.get()
  }
  
  ngOnDestroy() {    
    this.events.unsubscribe('cameras-reload');		
  }

  setFilteredItems(){    
    this.all = this.httpd.getCamerasByName(this.searchTerm)
  }

  get(){

    this.all = this.httpd.getCameras()    

    this.all.subscribe(data => {
        console.log(data)        
    })
  }

  showOptions(cam) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(cam)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(cam)
          }
        },
       {
          text: this.dataInfo.titleRemove,
          handler: () => {
            this.remove(cam)
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
    this.navCtrl.push('CamerasAddPage')
  }

  remove(acl){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemove, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(acl)
      }
    })    
  }

  removeContinue(acl){
    this.httpd.delCamera(acl).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.get()
        })
    })
  }

  edit(cam){
    this.navCtrl.push('CamerasAddPage', {load: true, info: cam})
  }

  copy(cam){
    this.navCtrl.push('CamerasAddPage', {load: false, info: cam, copy: true})
  }

}
