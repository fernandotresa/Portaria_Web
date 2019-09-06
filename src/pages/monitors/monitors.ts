import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { FormControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-monitors',
  templateUrl: 'monitors.html',
})
export class MonitorsPage {

  all: Observable<any>;
  searchTerm: string = '';
  searching: any = false;
  searchControl: FormControl;
  date: string;

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 

    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,    
    public events: Events,
    private iab: InAppBrowser,
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

  openCam(cam){
    console.log(cam)
    const browser = this.iab.create(cam.url);
  }

 
}
