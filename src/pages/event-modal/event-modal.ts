import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { DataInfoProvider } from '../../providers/data-info/data-info'




@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };


  minDate = moment().subtract(1, 'day').format()  
  maxDate = moment().add(1, 'year').format()
 
  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    public dataInfo: DataInfoProvider,
    public viewCtrl: ViewController) {

    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
