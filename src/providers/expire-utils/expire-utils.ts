import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
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

    data.success.forEach(element => {

      let dateS = moment(element.datetime_start).utc().format()
      let dateF = moment(element.datetime_end).utc().format()            
      
      let datetime_start = new Date(dateS)
      let datetime_end = new Date(dateF)

      datetime_start.setDate(moment(element.datetime_start).utc().date())
      datetime_start.setHours(moment(element.datetime_start).utc().hours())
      datetime_start.setMinutes(moment(element.datetime_start).utc().minutes())

      datetime_end.setDate(moment(element.datetime_end).utc().date())
      datetime_end.setHours(moment(element.datetime_end).utc().hours())
      datetime_end.setMinutes(moment(element.datetime_end).utc().minutes())
      
      this.dateStart = dateS
      this.dateEnd = dateF      

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: "primary"}            
      events.push(event);
    });       
    
    this.eventSource = []
    console.log(events)

    
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
  
    let checkOk = this.checkDatesExpiration()    
        
    if(checkOk)
      this.addExpiration()        

  }
          
  checkDatesExpiration(){
    let total = this.eventSource.length
    let start =  total === 0
    let checkOk = true;

    if(!start){
      let date0 = this.eventSource[0].startTime
      let isBefore = moment(this.selectedDay).isBefore(moment(date0))

      if(isBefore){
        checkOk = false
        this.uiUtils.showAlert("Atenção", "Data final não pode ser antes da data inicial").present()
      }      
    }  

    return checkOk;
  }   

  addExpiration(){    

    if(moment(this.selectedDay).isValid()){
      
      this.events.publish('calendarDisabled', true)
      this.events.publish('updatingDates', true)      

      let events = this.eventSource; 
    
      let startDate = new Date(this.selectedDay)
      startDate.setHours(0, 0, 1) 
      
      let endDate = new Date(this.selectedDay)
      endDate.setHours(23, 59, 0)

      if(events.length === 1){
        events[0].endTime = endDate
      }                    
      
      let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente',  color: "primary"}        
      events.push(event);     
    
      this.eventSource = []      

      setTimeout(() => {
        this.eventSource = events;
        this.events.publish('calendarDisabled', false)
        this.events.publish('updatingDates', false)
        this.events.publish('updateInputs', false)
        this.events.publish('eventSource', this.eventSource);		        
        })
    }    
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

      console.log(this.name, this.desc, this.selectedAccessType, start0F, end0F, start1F, end1F)
      
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

    console.log(this.eventSource)

    let start0 = this.eventSource[0].startTime
    let end0 = this.eventSource[0].endTime

    let start1 = this.eventSource[1].endTime
    let end1 = this.eventSource[1].endTime

    let start0F = moment(start0)
    let start1F = moment(start1)

    if(start1F.isBefore(start0F)){
      this.uiUtils.showAlert("Atenção", "Data final não pode ser antes da data inicial").present()
      this.events.publish('restartCalendar', 1); 

    } else {

      let loading = this.uiUtils.showLoading("Favor aguarde")          
      loading.present()       
      
      this.httpd.updateAccessProfileExpire(this.name, this.desc, this.selectedAccessType, start0, end0, this.profile.id, start1, end1)    
      .subscribe( () => {

        loading.dismiss()

        this.events.publish('navCtrlPop', this.selectedType); 
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
    }
  }



}
