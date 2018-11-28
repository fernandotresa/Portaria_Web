import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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

  calendarDisabled: Boolean = false

  name: string;
  desc: string;

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;   
  accessTypes: Observable<any>;
  selectedAccessType: string
  lastSelectedAccessType = new Date();
  dateStart: any
  dateEnd: any

  calendar = {
    mode: 'month',
    currentDate: new Date()            
  };

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.accessTypes = this.httpd.getAccessControlTypes()
    this.accessTypes.subscribe(data => {
      console.log(data)
    })
  }
  
  onViewTitleChanged(title) {
    console.log('onViewTitleChanged', title)
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    //console.log(event)

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
    
    if(! this.calendarDisabled){

      this.selectedDay = ev.selectedTime;

      if(this.lastSelectedAccessType == this.selectedDay){
        this.confirmExpiration(ev)    
      }
        
      this.lastSelectedAccessType = this.selectedDay
    }    
  }

  confirmExpiration(ev){

    let startOrEnd = this.eventSource.length === 0
    let msg = startOrEnd ? "Confirmar data inicial?" : "Confirmar data final?"
        
    this.uiUtils.showConfirm('Selecionar', msg).then(data => {      

      if(data){
        if(startOrEnd)
          this.addExpirationStart(ev)        
        
        else
          this.addExpirationEnd(ev)                     
      }
    })
  }

  addExpirationStart(ev){        
    let date = moment(ev.selectedTime).format()
    console.log(ev.currentDate)    
    this.markCalendar(date)    
  }

  addExpirationEnd(ev){    
    let date = moment(ev.selectedTime).format()
    console.log(ev.currentDate)    
    this.markCalendar(date)    
  }

  markCalendar(date){    
    this.calendarDisabled = true
    let event = { startTime: new Date(date), endTime: new Date(date), allDay: true };

    console.log(event)

    let events = this.eventSource;
    events.push(event);    
    this.eventSource = [];

    setTimeout(() => {    
      this.eventSource = events;

      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }


  addProfile(){
    console.log(this.name, this.desc, this.selectedAccessType)
  }

}
