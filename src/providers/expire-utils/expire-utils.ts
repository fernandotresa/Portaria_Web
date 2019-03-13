import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { CalendarUtilsProvider } from '../../providers/calendar-utils/calendar-utils';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'


@Injectable()
export class ExpireUtilsProvider {

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

  constructor(
    public httpd: HttpdProvider,
    public events: Events, 
    public calendarUtils: CalendarUtilsProvider,
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
  }


  loadDatesProfileExpire(idProfile: number){    

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileExpireContinue(data)
    })
  }

  loadDatesProfileExpireContinue(data){    

    let loading = this.uiUtils.showLoading("Favor aguarde")    
    loading.present() 

    this.events.publish('calendarDisabled', false)
        
    let events = this.eventSource;

    let element = data.success[0]

    let dateS = this.calendarUtils.parseDateBr(moment(element.datetime_start).utc().format())
    let dateF = this.calendarUtils.parseDateBr(moment(element.datetime_end).format())
        
    let datetime_start = moment(dateS).toDate()                       
    let datetime_end = moment(dateF).toDate()
    
    this.dateStart = dateS
    this.dateEnd = dateF      

    let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: "primary"}            
    events.push(event);

    console.log(events)
    
    this.eventSource = []
    
    setTimeout(() => {
      this.eventSource = events;
      
      this.events.publish('calendarDisabled', true)
        this.events.publish('eventSource', this.eventSource)
        this.events.publish('dateStart', this.dateStart)
        this.events.publish('dateEnd', this.dateEnd)
        loading.dismiss()
    });
  }

  confirmExpiration(ev){
  
    console.log("confirmExpiration", this.eventSource)

    let checkOk = this.checkDatesExpiration()    
        
    if(! checkOk)
      this.eventSource = []

    this.addExpiration()           

  }
          
  checkDatesExpiration(){
    
    let checkOk = true;

    if(this.eventSource.length > 0){
      let date0 = this.eventSource[0].startTime

      let isBefore = moment(this.selectedDay).isBefore(moment(date0))

      if(isBefore)
        checkOk = false       
    }  
    

    return checkOk;
  }   

  addExpiration(){    

    if(moment(this.selectedDay).isValid()){
      
      this.events.publish('calendarDisabled', true)
      this.events.publish('updatingDates', true)      

      let events = this.eventSource

      let startDate = new Date(this.selectedDay)
      startDate.setHours(0, 0, 1) 
      
      let endDate = new Date(this.selectedDay)
      endDate.setHours(23, 59, 0)                     
    
      if(this.eventSource.length > 0){

        this.dateStart = moment(this.eventSource[0].startTime).toISOString()
        startDate = moment(this.dateStart).toDate()               

      } 
      
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
      })
    }    
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

    else 
      console.log("Condição nao localizada")
  }

  addProfileExpire(){ 

    let start0 = this.eventSource[0].startTime
    let end0 = this.eventSource[0].endTime

    let start1 = this.eventSource[1].startTime
    let end1 = this.eventSource[1].endTime

    let start0F = moment(start0)
    let end0F = moment(end0)

    let start1F = moment(start1)
    let end1F = moment(end1)

    if(start1F.isBefore(start0F)){
        
      this.uiUtils.showAlert("Atenção", "Data final não pode ser antes da data inicial").present()            
      this.events.publish('restartCalendar', 1); 

    } else {

      let loading = this.uiUtils.showLoading("Favor aguarde")
      loading.present()
      
      this.httpd.addAccessProfileExpire(this.name, this.desc, this.selectedAccessType, 
        start0F, end0F, start1F, end1F)    

      .subscribe( () => {

        loading.dismiss()               
        this.events.publish('refreshProfiles', this.selectedType); 
        this.events.publish('navCtrlPop', this.selectedType); 
        this.uiUtils.showAlertSuccess()

      })
    }   
  }   

  updateProfileExpire(){

    if(this.eventSource.length === 0)
      this.uiUtils.showAlert("Atenção", "Favor selecionar datas").present()

    else 
      this.updateProfileContinue()
 
  }

  updateProfileContinue(){    
   
    let start = moment(this.dateStart)
    let end = moment(this.dateEnd)

    let loading = this.uiUtils.showLoading("Favor aguarde")          
      loading.present()       
      
      this.httpd.updateAccessProfileExpire(this.name, this.desc, this.selectedAccessType, start, end, this.profile.id)    
      .subscribe( () => {

        loading.dismiss()

        this.events.publish('navCtrlPop', this.selectedType); 
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
  }

}
