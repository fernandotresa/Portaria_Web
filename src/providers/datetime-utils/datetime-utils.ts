import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { MomentsProvider } from '../../providers/moments/moments';

@Injectable()
export class DatetimeUtilsProvider {

  eventSource: any = []
  dateStart: string
  dateEnd: string
  selectedDay = new Date();
  name: string
  desc: string
  selectedAccessType: string
  profile: any
  selectedType: string;
  calendarDisabled:Boolean = false
  hourStart: any
  hourEnd: any
  shiftClicked: Boolean = false

  constructor(
    public httpd: HttpdProvider,
    public events: Events, 
    public moments: MomentsProvider,
    public uiUtils: UiUtilsProvider) {

      this.eventSource = []

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

    this.events.subscribe('setSelectedDay', selectedDay => {
      this.selectedDay = selectedDay
    })

    this.events.subscribe('setName', name => {
      this.name = name
    })

    this.events.subscribe('setDesc', desc => {
      this.desc = desc
    })

    this.events.subscribe('setSelectedAccessType', selectedAccessType => {
      this.selectedAccessType = selectedAccessType
    })

    this.events.subscribe('setSelectedType', selectedType => {
      this.selectedType = selectedType
    })

    this.events.subscribe('setProfile', profile => {
      this.profile = profile
    })

    this.events.subscribe('setHourStart', hourStart => {
      this.hourStart = hourStart
    })

    this.events.subscribe('setHourEnd', hourEnd => {
      this.hourEnd = hourEnd
    })
  }

  ngOnDestroy() {    
    this.events.unsubscribe('calendarDisabled');		
    this.events.unsubscribe('eventSource');		
    this.events.unsubscribe('dateStart');		
    this.events.unsubscribe('dateEnd');		
    this.events.unsubscribe('setSelectedDay');		
    this.events.unsubscribe('setName');		
    this.events.unsubscribe('setDesc');	
    this.events.unsubscribe('setSelectedAccessType');	
    this.events.unsubscribe('setHourStart');	
    this.events.unsubscribe('setHourEnd');	
  }

  confirmDatetime(){

    if(this.shiftClicked)
      this.addEventDateShift()
    else 
      this.addEventDateNormal()
  }

  addEventDateNormal(){    

    if(moment(this.selectedDay).isValid()){

      let loading = this.uiUtils.showLoading("Favor aguarde")    
      loading.present() 
      
      this.events.publish('calendarDisabled', true)
      this.events.publish('updatingDates', true)

      let events = this.eventSource; 

      let startDate = new Date(this.selectedDay)
      startDate.setHours(0, 0, 1) 
      
      let endDate = new Date(this.selectedDay)
      endDate.setHours(23, 59, 0)                     
    

      let h = this.hourStart.substring(0, 2);
      let m = this.hourStart.substring(3, 5);
      let s = this.hourStart.substring(6, 8);

      let he = this.hourEnd.substring(0, 2);
      let me = this.hourEnd.substring(3, 5);
      let se = this.hourEnd.substring(6, 8);

      startDate.setHours(h, m, s)
      endDate.setHours(he, me, se)

      let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente',  color: "primary"}        

      events.push(event);     
    
      this.eventSource = []
    
      setTimeout(() => {
        this.eventSource = events;        
        this.events.publish('eventSource', this.eventSource);        
        })

      setTimeout(() => {
        this.populateDates(startDate, endDate)  
        this.events.publish('calendarDisabled', false)        
        this.events.publish('updatingDates', false)
        this.events.publish('updateInputs', false)
        loading.dismiss()
      })
    }    
  }  

  addEventDateShift(){    

    console.log("addEventDateShift")
    
    if(moment(this.selectedDay).isValid()){      
      
      this.calendarDisabled = true     
     // this.updatingDates = true
      let events = this.eventSource;    

      let startDate = new Date(this.dateStart)
      let endDate = new Date(this.dateEnd)
      this.setHours(startDate, endDate)

      let event = { startTime: startDate, endTime: endDate,  title: 'Carregado automaticamente',  color: "primary"}    

      events.push(event);     

      this.eventSource = []

      if(events.length === 2){    
        
        let a = events[0].startTime      

          for (var m = moment(a); m.isBefore(endDate); m.add(1, 'days')) {

            let startDateB = new Date(m.format())
            let endDateB = new Date(m.format())

            this.setHours(startDate, endDate)

            let eventB = { startTime: startDateB, endTime: endDateB, 
              title: 'Carregado automaticamente',  color: "primary"}    

            events.push(eventB);
          }
          
      }

      //this.refreshCalendar()
      
    }    
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
    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()
      
      this.httpd.addAccessProfileDatetime(this.name, this.desc, 
        this.selectedAccessType, this.eventSource)    
        
      .subscribe( () => {

        loading.dismiss()

        this.events.publish('navCtrlPop', this.selectedType); 
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
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

  setHours(startDate, endDate){

    let h = this.hourStart.substring(0, 2);
    let m = this.hourStart.substring(3, 5);
    let s = this.hourStart.substring(6, 8);

    let he = this.hourEnd.substring(0, 2);
    let me = this.hourEnd.substring(3, 5);
    let se = this.hourEnd.substring(6, 8);

    startDate.setHours(h, m, s)
    endDate.setHours(he, me, se)
  }

  populateDates(startDate, endDate){  

    if(this.dateStart === undefined)
      this.events.publish('updateDateStart', startDate);

    else if(this.dateStart.length === 0 && this.dateEnd.length === 0)
      this.events.publish('updateDateStart', startDate);

    else if(this.dateStart.length > 0 && this.dateEnd === undefined)
      this.events.publish('updateDateEnd', endDate);

    else if(this.dateStart.length > 0 && this.dateEnd.length === 0)
      this.events.publish('updateDateEnd', endDate);

    else if(this.dateStart.length > 0 && this.dateEnd.length > 0)
      this.events.publish('updateDateEnd', endDate);   
  }


}
