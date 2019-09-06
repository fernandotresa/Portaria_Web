import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { DataInfoProvider } from '../../providers/data-info/data-info';
import { Observable } from 'rxjs/Observable';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@IonicPage()
@Component({
  selector: 'page-receptor',
  templateUrl: 'receptor.html',
})
export class ReceptorPage {

  allReceptors: Observable<any>;
  searchTerm: string
  apCameras: any = []
  apCameraSelected: any = []

  constructor(public navCtrl: NavController, 
    public uiUtils: UiUtilsProvider,
    public httpd: HttpdProvider,
    private iab: InAppBrowser,
    public dataInfo: DataInfoProvider,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptorPage');

    this.allReceptors = this.httpd.getAllReceptors()

    this.allReceptors.subscribe(data => {      
      console.log(data)
    })
  } 

  setFilteredItems(){

    console.log(this.searchTerm)
    this.httpd.getAllReceptorByName(this.searchTerm)       
  }

  
  openCam(cam){
    this.httpd.getCameraPonto(cam.id)
    .subscribe( data => {
      this.loadCamerasCallback(data)
    })
  }

  loadCamerasCallback(data){
    
    this.apCameras = []

    data.success.forEach(element => {
      this.apCameras.push(element.name)

      console.log(this.apCameras)
    });
  }

  
  sendCommand(idCommand_: number, receptor){

    console.log(receptor)
    
    //let id = this.dataInfo.userInfo.id_usuario
    let id = 1
    let ip_ponto_acesso = receptor.ip

    this.httpd.systemCommand(idCommand_, id, ip_ponto_acesso)

    .subscribe( () => {   
      this.uiUtils.showAlertSuccess()    
    })    
  }  

  open(receptor){
    this.sendCommand(1, receptor)        
  }

  close(receptor){
    this.sendCommand(2, receptor)        
  }

  sendAudio(receptor){
    this.sendCommand(3, receptor)        
  }

  
}
