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
  minDate: any
  maxDate: any  
 
  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    public dataInfo: DataInfoProvider,
    public viewCtrl: ViewController) {

    let selectedDay = this.navParams.get('selectedDay')    

    this.event.startTime = moment(selectedDay).startOf('day').format();
    this.event.endTime = moment(selectedDay).endOf('day').format();
    this.minDate = moment(selectedDay).startOf('day').format()
    this.maxDate =moment(selectedDay).endOf('day').format();

    console.log(this.event)

  }
 
  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
