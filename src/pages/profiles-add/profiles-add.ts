import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-profiles-add',
  templateUrl: 'profiles-add.html',
})
export class ProfilesAddPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  accessTypes: Observable<any>;
  selectedAccessType: string
  lastSelectedAccessType = new Date();

  dateStart: any
  dateEnd: any

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    private modalCtrl: ModalController, 
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PermissionGroupsPage');

    this.accessTypes = this.httpd.getAccessControlTypes()
    this.accessTypes.subscribe(data => {
      console.log(data)
    })
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    console.log(title)
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    console.log(event)

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    console.log(ev)      

    this.selectedDay = ev.selectedTime;

    if(this.lastSelectedAccessType == this.selectedDay){
      console.log('clicou 2x')
      this.confirmExpiration(ev)
    } 

    this.lastSelectedAccessType = this.selectedDay
  }

  confirmExpiration(ev){
        
    this.uiUtils.showConfirm('Selecionar', "Confirmar data inicial?").then(data => {
      console.log(data)

      if(data){
        this.createExpirationStart(ev)
      }
    })
  }

  createExpirationStart(ev){
    //let selected = moment(ev.selectedTime).format('LL');
    let event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };

    let events = this.eventSource;
        events.push(event);
        
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
  }

}
