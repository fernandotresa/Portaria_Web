import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-acls-link',
  templateUrl: 'acls-link.html',
})
export class AclsLinkPage {

  sectors: Observable<any>;
  selectedArray: any = []
  allSectors: any = []
  
  profile: any

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AclsLinkPage');
    this.profile = this.navParams.get('profile')

  }

  getSectors(){
    this.sectors = this.httpd.getSectors()
    this.sectors.subscribe( () => {
        this.loadProfileInfo()
    })
  }

  loadProfileInfo(){              
    
    this.httpd.getAclsSectorsById(this.profile.id)
    .subscribe(data => {
        this.loadSectors(data)
    })
  }

  loadSectors(data){

    data.success.forEach(element => {      
      
      this.allSectors.forEach(sector => {
        if(sector.id === element.id_sector){

          this.selectedSectorClicked(sector)          
          this.selectedArray.push(sector)
        }
      });      
    });
  }

  selectedSectorClicked(sector){

    sector.isChecked = !sector.isChecked

    if(! sector.isChecked){
      const index = this.selectedArray.indexOf(sector, 0);

      if (index > -1) {
        this.selectedArray.splice(index, 1);
      }      
    }          
    else {
      this.selectedArray.push(sector)  
    }        
  }

}
