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
  selector: 'page-badges',
  templateUrl: 'badges.html',
})
export class BadgesPage {

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
      
      this.events.subscribe('badge-reload', () => {        
        this.get()
      });
  }
  
  ngOnDestroy() {    
    this.events.unsubscribe('badge-reload');		
  }

  setFilteredItems(){    
    this.all = this.httpd.getBadgesNumber(this.searchTerm)
  }

  get(){
    this.all = this.httpd.getBadges()    
    this.all.subscribe(data => {
        console.log(data)        
    })
  }

  showOptions(badge) {

    const actionSheet = this.actionSheetCtrl.create({
      title: this.dataInfo.titleSelect,
      buttons: [
        {
          text: this.dataInfo.titleEdit,
          handler: () => {
            this.edit(badge)
          }
        },
        {
          text: this.dataInfo.titleDuplicate,
          handler: () => {
            this.copy(badge)
          }
        },
       {
          text: this.dataInfo.titleRemove,
          handler: () => {
            this.remove(badge)
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
    this.navCtrl.push('BadgesAddPage')
  }

  remove(badge){
    
    this.uiUtils.showConfirm(this.dataInfo.titleRemove, this.dataInfo.titleDoYouWantRemove)
    .then(res => {
      if(res){
        this.removeContinue(badge)
      }
    })    
  }

  removeContinue(badge){
    this.httpd.delBadge(badge).subscribe( () => {
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleOperationSuccess).present()
        .then( () => {        
          this.setFilteredItems()
        })
    })
  }

  edit(badge){
    this.navCtrl.push('BadgesAddPage', {load: true, info: badge})
  }

  copy(office){
    this.navCtrl.push('BadgesAddPage', {load: false, info: office, copy: true})
  }

}
