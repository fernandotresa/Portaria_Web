import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as momenttz from 'moment-timezone';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { MomentsProvider } from '../../providers/moments/moments';

@Injectable()
export class DatetimeUtilsProvider {

  eventSource: any = []

  dateStart: string
  dateEnd: string

  selectedDay: Date;

  name: string
  desc: string
  selectedAccessType: string
  profile: any
  selectedType: string;
  calendarDisabled:Boolean = false
  hourStart: any
  hourEnd: any
  shiftClicked: Boolean = false
  updatingHour: Boolean = false

  constructor(
    public httpd: HttpdProvider,
    public events: Events, 
    public moments: MomentsProvider,
    public uiUtils: UiUtilsProvider) {

      this.eventSource = []

      this.subscribeStuff()
      this.selectedDay = new Date()
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
      this.updateHourStartNew()         
    })

    this.events.subscribe('setHourEnd', hourEnd => {
      this.hourEnd = hourEnd      
      this.updateHourEndNew()
    })


    this.events.subscribe('shiftClicked', shiftClicked => {      
      this.shiftClicked = shiftClicked
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
  
  refreshCalendar(startDate, endDate, events){

    setTimeout(() => {
      this.eventSource = events; 

      this.events.publish('eventSource', this.eventSource);        
      this.populateDates(startDate, endDate)  
      this.events.publish('calendarDisabled', false)        
      this.events.publish('updatingDates', false)
      this.events.publish('updateInputs', false)      
      this.events.publish('updateHourStart', this.hourStart)      
      this.events.publish('updateHourEnd', this.hourEnd)      
    })
    
  }

  addDatesRange(events, startDate, endDate){

    let ev = events
    let a = events[0].startTime      
    this.setHours(startDate, endDate)

    for (var m = moment(a); m.isBefore(endDate); m.add(1, 'days')) {

      let startDateB = new Date(m.format())
      let endDateB = new Date(m.format())
      this.setHours(startDateB, endDateB)      

      let eventB = { startTime: startDateB, endTime: endDateB, 
        title: 'Carregado automaticamente',  color: "primary"}    

        ev.push(eventB);
    }


    return ev
  }
 
  addEventDateShift(){   
    
    if(moment(this.selectedDay).isValid()){      
      
      this.events.publish('calendarDisabled', true)
      this.events.publish('updatingDates', true)

      let events = this.eventSource;    

      let startDate = new Date(this.selectedDay)
      let endDate = new Date(this.selectedDay)

      this.setHours(startDate, endDate)

      let event = { startTime: startDate, endTime: endDate,  title: 'Carregado automaticamente',  color: "primary"}    

      events.push(event);     

      this.eventSource = []
      
      if(events.length > 0){
        events = this.addDatesRange(events, startDate, endDate)                      
        this.dateStart = this.moments.parseDateBr(events[0].startTime)
        events[0].endTime = new Date(endDate)
      }
      
      this.refreshCalendar(startDate, endDate, events)        
    }     
  }  

  addEventDateNormal(){    

    if(moment(this.selectedDay).isValid()){

      let loading = this.uiUtils.showLoading("Favor aguarde")    
      loading.present() 
      
      this.events.publish('calendarDisabled', true)
      this.events.publish('updatingDates', true)

      let events = this.eventSource; 

      let startDate = new Date(this.selectedDay)      
      let endDate = new Date(this.selectedDay)
      this.setHours(startDate, endDate)

      let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente',  color: "primary"}      

      events.push(event);     
    
      loading.dismiss()
      this.eventSource = []         
            
      this.refreshCalendar(startDate, endDate, events)
    }
    
  } 

  loadDatesProfileDatetime(idProfile: number){    

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileDatetimeContinue(data)
    })
  }

  loadDatesProfileDatetimeContinue(data){    
  
    if(data.success.length > 0){

    let loading = this.uiUtils.showLoading("Favor aguarde")    
    loading.present() 
    this.shiftClicked = true

    this.events.publish('calendarDisabled', true)
    this.events.publish('updatingDates', true)

    let events = this.eventSource;        

    let datetime_start = new Date()          
    let datetime_end = new Date()

    data.success.forEach(element => {

      let dateS = momenttz(element.datetime_start).utc().format("YYYY-MM-DDTHH:mm:ss")
      let dateF = momenttz(element.datetime_end).utc().format("YYYY-MM-DDTHH:mm:ss")

      datetime_start = new Date(dateS)
      datetime_end = new Date(dateF)

      this.hourStart = momenttz(element.datetime_start).utc().format("HH:mm:ss")
      this.hourEnd = momenttz(element.datetime_end).utc().format("HH:mm:ss")      
          
      this.setHours(datetime_start, datetime_end)

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: "primary"}      
      events.push(event);
    });          

    if(events.length > 0){
      this.dateStart = this.moments.parseDateBr(events[0].startTime)
      events[0].endTime = new Date(datetime_end)
    }
    
    this.addDatesRange(events, datetime_start, datetime_end)

    this.eventSource = []    

    let start = this.moments.parseDateBr(moment(this.dateStart).utc().format())   

    loading.dismiss()

    this.refreshCalendar(start, datetime_end, events)
    
    }    
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

    let loading = this.uiUtils.showLoading("Favor aguarde")
    loading.present()
    
    this.httpd.updateAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource, this.profile.id)    
    .subscribe( () => {

      loading.dismiss()

      this.events.publish('navCtrlPop', this.selectedType); 
      this.events.publish('refreshProfiles', this.selectedType); 
      this.uiUtils.showAlertSuccess()
    })
  }

  setHours(startDate, endDate){

    this.setHoursStart(startDate)
    this.setHoursEnd(endDate)
  }

  setHoursStart(startDate){

    let h = this.hourStart.substring(0, 2);
    let m = this.hourStart.substring(3, 5);
    let s = this.hourStart.substring(6, 8);    

    startDate.setHours(h, m, s)    
  }

  setHoursEnd(endDate){

    let he = this.hourEnd.substring(0, 2);
    let me = this.hourEnd.substring(3, 5);
    let se = this.hourEnd.substring(6, 8);
    
    endDate.setHours(he, me, se)
  }

  populateDates(startDate, endDate){  
    this.events.publish('updateDateStart', startDate);
    this.events.publish('updateDateEnd', endDate);   
  }

  updateHourStartNew(){
    
    if(! this.updatingHour){

      this.updatingHour = true

      let datetime_start;         
      let datetime_end;
      let events = []
  
     for(let i = 0; i < this.eventSource.length; ++i) {
        
        let element = this.eventSource[i]
  
        let dateS = moment(element.startTime).utc().format()
        datetime_start = new Date(dateS)
  
        let dateF = moment(element.startTime).utc().format()
        datetime_end = new Date(dateF)
            
        this.setHoursStart(datetime_start)
        this.setHoursEnd(datetime_end)
  
        let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: "primary"}      
        events.push(event)
      };  
              
      this.eventSource = []
  
      this.refreshCalendar(datetime_start, datetime_end, events)

      let self = this

      setTimeout(function(){

        self.updatingHour = false
      }, 1000)
    }
  }

  updateHourEndNew(){
    this.updateHourStartNew()
  }  
}
