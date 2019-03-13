import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'


@Injectable()
export class DatetimeUtilsProvider {

  eventSource: any = []
  dateStart: string
  dateEnd: string
  selectedDay: Date;

  calendarDisabled:Boolean = false

  constructor(
    public httpd: HttpdProvider,
    public events: Events, 
    public uiUtils: UiUtilsProvider) {

      this.subscribeStuff()
  }

  subscribeStuff(){

    this.events.subscribe('setCalendarDisabled', calendarDisabled => {
      this.calendarDisabled = calendarDisabled
    })

    this.events.subscribe('setEventSource', eventSource => {
      this.eventSource = eventSource
    })

    this.events.subscribe('setDateStart', dateStart => {
      this.dateStart = dateStart
    })

    this.events.subscribe('setDateEnd', dateEnd => {
      this.dateEnd = dateEnd
    })
  }

  ngOnDestroy() {    
    this.events.unsubscribe('calendarDisabled');		
    this.events.unsubscribe('eventSource');		
    this.events.unsubscribe('dateStart');		
    this.events.unsubscribe('dateEnd');		
  }


  loadDatesProfileDatetime(idProfile: number){    
    

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileDatetimeContinue(data)
    })
  }

  loadDatesProfileDatetimeContinue(data){    
  
    this.calendarDisabled = true     
    let events = this.eventSource;

    if(data.success.length > 0){
      this.dateStart = moment(data.success[0].datetime_start).utc().format()
    }    

    let total = data.success.length
    let atual = 0

    data.success.forEach(element => {

      let dateS = moment(element.datetime_start).utc().format()
      let dateF = moment(element.datetime_end).utc().format()

      let datetime_start = new Date(dateS)          
      let datetime_end = new Date(dateS)

      datetime_start.setDate(moment(element.datetime_start).utc().date())
      datetime_start.setHours(moment(element.datetime_start).utc().hours())
      datetime_start.setMinutes(moment(element.datetime_start).utc().minutes())

      datetime_end.setDate(moment(element.datetime_end).utc().date())
      datetime_end.setHours(moment(element.datetime_end).utc().hours())
      datetime_end.setMinutes(moment(element.datetime_end).utc().minutes())
      
      this.dateEnd = dateF
    
      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: "primary"}      
      events.push(event);

      atual++
    });  
    
    this.eventSource = []

    setTimeout(() => {
      this.eventSource = events;

      console.log(events)
      
      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }

  addProfileDateTimes() {    
   /* let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()
      
      this.httpd.addAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })*/
  } 

  updateProfileDateTimes(){
   /* let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.updateAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource, this.profile.id)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.profile.id_type);
        this.uiUtils.showAlertSuccess()
      })*/
  }


}
