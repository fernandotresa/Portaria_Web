import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { MomentsProvider } from '../../providers/moments/moments';

import { DatetimeUtilsProvider } from '../../providers/datetime-utils/datetime-utils';
import { ExpireUtilsProvider } from '../../providers/expire-utils/expire-utils';
import { DayweekUtilsProvider } from '../../providers/dayweek-utils/dayweek-utils';

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

  profile: any

  name: string;
  desc: string;
  loadProfile: Boolean = false
  copyProfile: Boolean = false

  eventSource = [];
  viewTitle: string;

  selectedType: number = 0
  selectedDay = new Date();

  datesWeek = []  

  selectedMonth: string;
  updatingDates: Boolean = false
  updatingClick: Boolean = false

  lockSwipe: Boolean = false  

  accessTypes: Observable<any>;
  selectedAccessType: string
  lastSelectedDay = new Date();
    
  dateStart: string
  dateEnd: string

  hourStart: any
  hourEnd: any

  shiftClicked: Boolean = false

  calendar = {
    mode: 'month',
    locale: 'pt',
    currentDate: new Date()            
  };

  colors: string[] = ['primary', 'warning', 'danger', 'success'];

  @HostListener('document:keydown.Shift', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.shiftClicked = true
    this.events.publish('shiftClicked', this.shiftClicked)
  }

  @HostListener('document:keyup.Shift', ['$event']) onKeyupHandler(event: KeyboardEvent) {    
    this.shiftClicked = false   
    this.events.publish('shiftClicked', this.shiftClicked)
  } 

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,
    public dataInfo: DataInfoProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public moments: MomentsProvider,
    public datetimeUtils: DatetimeUtilsProvider,
    public expireUtils: ExpireUtilsProvider,
    public dayweekUtils: DayweekUtilsProvider,
    public navParams: NavParams) {  

      moment.locale('pt-br');       
  }


  ionViewDidLoad() {      
    this.loadProfile = this.navParams.get('loadProfile')
    this.profile = this.navParams.get('profile')
    this.copyProfile = this.navParams.get('copyProfile')   

    this.selectedType = this.navParams.get('selectedType')    
    let selectedTypeName = this.navParams.get('selectedTypeName')    

    if(selectedTypeName)
      this.selectedAccessType = selectedTypeName    
    
    this.startInterface()  
  }

  ngAfterViewInit() {
    var me = this;
    setTimeout(function() {
        me.lockSwipe = true;
    },1000);
  }

  startInterface(){
    this.eventSource = []
    this.subscribeStuff()
        
    this.getAccessTypes()    
    this.selectedMonth  = moment(this.selectedDay).format("MMMM")    
    this.onViewTitleChanged(this.selectedMonth)

    this.hourStart = moment().startOf('day').format('HH:mm:ss')
    this.hourEnd = moment().endOf('day').format('HH:mm:ss')
  }

  subscribeStuff(){

    this.events.subscribe('calendarDisabled', calendarDisabled => {
      this.calendarDisabled = calendarDisabled
    })

    this.events.subscribe('updateInputs', updateInputs => {
      this.updateInputs = updateInputs
    })

    this.events.subscribe('eventSource', eventSource => {
      this.eventSource = eventSource      
      this.refreshCalendar()
    })

    this.events.subscribe('refreshCalendar', () => {         
      this.refreshCalendar()
    })

    this.events.subscribe('selectedDay', selectedDay => {         
      this.selectedDay = selectedDay
    })

    this.events.subscribe('dateStart', dateStart => {      
      this.updatingDates = true  
      this.dateStart = dateStart
      this.updatingDates = false
    })

    this.events.subscribe('dateEnd', dateEnd => {
      this.updatingDates = true 
      this.dateEnd = dateEnd
      this.updatingDates = false
    })

    this.events.subscribe('navCtrlPop', () => {
      this.navCtrl.pop()
    })

    this.events.subscribe('restartCalendar', () => {
      this.restartCalendar()
    })

    this.events.subscribe('updateDateStart', startDate => {

      this.updatingDates = true      
      this.dateStart = moment(startDate).format()
      
      setTimeout(() => {
        this.updatingDates = false  
      });
    })

    this.events.subscribe('updateDateEnd', endDate => {
      this.updatingDates = true      
      this.dateEnd = moment(endDate).format()
      
      setTimeout(() => {
        this.updatingDates = false  
      });
    })
  }

  ngOnDestroy() {    
    this.events.unsubscribe('calendarDisabled');		
    this.events.unsubscribe('eventSource');		
    this.events.unsubscribe('dateStart');		
    this.events.unsubscribe('dateEnd');		
    this.events.unsubscribe('navCtrlPop');		
    this.events.unsubscribe('selectedDay');		
    this.events.unsubscribe('restartCalendar');		
  }
    
  getAccessTypes(){
    this.accessTypes = this.httpd.getAccessControlTypes()
    this.accessTypes.subscribe( () => {    

      if(this.loadProfile)
        this.loadProfileInfo()  
        
      if(this.copyProfile)
        this.copyProfileInfo()
    })
  }

  updateItens(){

    this.events.publish('setSelectedDay', this.selectedDay)
    this.events.publish('setHourStart', this.hourStart)
    this.events.publish('setHourEnd', this.hourEnd)
    this.events.publish('setCalendarDisabled', this.calendarDisabled)
    this.events.publish('setDateStart', this.dateStart)
    this.events.publish('setDateEnd', this.dateEnd)
    this.events.publish('setEventSource', this.eventSource)    
    this.events.publish('setName', this.name)    
    this.events.publish('setDesc', this.desc)
    this.events.publish('shiftClicked', this.shiftClicked)
    this.events.publish('setSelectedAccessType', this.selectedAccessType)
    this.events.publish('setSelectedType', this.selectedType)
    this.events.publish('setProfile', this.profile)

    console.log(this.hourStart, this.hourEnd)
    
  }

  copyProfileInfo(){
    this.name = this.profile.name + this.dataInfo.titleCopyProfile
    this.desc = this.profile.description + this.dataInfo.titleCopyProfile
    this.selectedAccessType = this.profile.type    

    let type = this.profile.id_type

    this.updateItens()

    if(type === 1)
      this.expireUtils.loadDatesProfileExpire(this.profile.id)        

   else if(type === 2)    
      this.datetimeUtils.loadDatesProfileDatetime(this.profile.id)

    else if(type === 3)    
      this.dayweekUtils.loadWeekdaysProfile(this.profile.id)

    else if(type === 4)    
      this.loadVacationsProfile()
  }

  loadProfileInfo(){

    this.name = this.profile.name
    this.desc = this.profile.description
    this.selectedAccessType = this.profile.type  
    this.updatingDates = true
    let type = this.profile.id_type

    this.updateItens()

    if(type === 1)
      this.expireUtils.loadDatesProfileExpire(this.profile.id)        

    else if(type === 2)    
      this.datetimeUtils.loadDatesProfileDatetime(this.profile.id)

    else if(type === 3)    
      this.dayweekUtils.loadWeekdaysProfile(this.profile.id)

    else if(type === 4)    
      this.loadVacationsProfile()
  }

  getColorStatus(col: number){   
    let color = 'primary'  
    return color;
  }  

  
  parseTimestamp(timestampStr) {          
    return new Date(timestampStr)
  };

  
  loadVacationsProfile(){    
   // this.loadDatesProfileDatetime()
  }
     
  onTimeSelected(ev) {            

    console.log("onTimeSelected", this.updatingDates,  this.lastSelectedDay)

    if(this.selectedAccessType == this.dataInfo.titleProfileDatetime){

      this.onTimeSelectedDateTime(ev)

    } else {

      if(this.lastSelectedDay === this.selectedDay){

        if(! this.updatingDates && ! this.calendarDisabled){        
    
          if(moment(this.selectedDay).isValid()){
    
            this.updatingDates = true
            this.calendarDisabled = true    
  
            this.selectedMonth  = moment(this.selectedDay).format("MMMM")
            this.onViewTitleChanged(this.selectedMonth)
            this.onTimeSelectedContinue(ev)
          }                  
        }         
      }           
  
      this.lastSelectedDay = this.selectedDay

    }
    
  }
  
  onTimeSelectedDateTime(ev){
    console.log("onTimeSelectedDateTime")


    if(! this.updatingDates && ! this.calendarDisabled){        
    
      if(moment(this.selectedDay).isValid()){

        this.updatingDates = true
        this.calendarDisabled = true    

        this.selectedMonth  = moment(this.selectedDay).format("MMMM")
        this.onViewTitleChanged(this.selectedMonth)
        this.onTimeSelectedContinue(ev)
      }                  
    }
  }

  onTimeSelectedContinue(ev){

    this.selectedDay = ev.selectedTime;    

    let refresh = true

    let dayClicked = new Date(this.selectedDay)                

    for(let i = 0; i < this.eventSource.length; ++i){
      
      let day = new Date()
      let isSame = moment(day).isSame(dayClicked, 'day')    

      if(isSame){            
        this.eventSource.splice(i, 1);
        refresh = false
      }
    }
    
    if(refresh)
      this.checkAccessType(ev)         
  }  

  checkAccessType(ev){
        
    this.updateItens() 
    
    if(this.selectedAccessType === this.dataInfo.titleProfileExpire)
      this.expireUtils.confirmExpiration(ev)

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.datetimeUtils.confirmDatetime()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.datetimeUtils.confirmDatetime()
  }
    
  addProfile(){

    this.updateItens()

    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)    
      this.expireUtils.addProfileExpire()      

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.datetimeUtils.addProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.dayweekUtils.addProfileDayWeek()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.addProfileVacation()
  }
    
  
  addProfileVacation(){
    //this.addProfileDateTimes()
  }

  updateProfile(){

    this.updateItens()

    if(this.selectedAccessType === this.dataInfo.titleProfileExpire)
      this.expireUtils.updateProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.datetimeUtils.updateProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.dayweekUtils.updateProfileDayWeek()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.updateProfileVacation()
  }   

  updateProfileVacation(){
    //this.updateProfileDateTimes()
  }  

  restartCalendar(){    
      
      this.eventSource.splice(0, this.eventSource.length)            
      this.refreshCalendar()   
  }

  refreshCalendar(){

    this.calendarDisabled = true      
    
    let events = this.eventSource;      
    this.eventSource = [];

    setTimeout(() => {    
      this.eventSource = events;      
      this.calendarDisabled = false            
    });
  }  

  goHome(){
    this.navCtrl.popToRoot()
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  onViewTitleChanged = (title: string) => {
    this.viewTitle = title;
  };

  today() {
    this.calendar.currentDate = new Date();
  }

  onCurrentDateChanged(event){   
    if(moment(event).isValid()){
      let month = moment(event).format("MMMM")    
      this.onViewTitleChanged(month)

    } else {      
      let month = moment(new Date()).format("MMMM")    
      this.onViewTitleChanged(month)
    }    
  }  

  clearCal(){
    this.updatingDates = true

    this.dateEnd = ""
    this.dateStart = ""

    this.restartCalendar()
    this.eventSource = [];    

    let self = this

    setTimeout(function(){            
      self.viewTitle = moment().format()        
      self.updatingDates = false
    }, 2000)
  }

  updateInputs(){

    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.updateInputProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.updateInputProfileDatetimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.updateInputProfileVacation()
  }

  updateInputProfileExpire(){        
    let self = this

    if(! this.updatingDates){

      this.updatingClick = true
      this.updatingDates = true
      let total = this.eventSource.length      

      if(total === 1){   
        
        let start = this.eventSource[0].startTime        
        let dateS = moment(start).format()             
        this.dateStart = dateS        
      }
        
      if(total > 1){        

        let start = this.eventSource[1].endTime
        let dateF = moment(start).format()             
        this.dateEnd = dateF        
      }        
        
      setTimeout(function(){
        self.updatingDates = false
        self.updatingClick = false        
      })
    }           
  }

  updateInputProfileDatetimes(){

    let self = this

    if(! this.updatingDates){

      this.updatingDates = true
      this.updatingClick = true
      let total = this.eventSource.length      

      if(total === 1){   
        
        let start = this.eventSource[0].startTime
        let dateS = moment(start).utc().format()             
        this.dateStart = dateS        
      }              

      if(total > 1){

        let last

        this.eventSource.forEach(element => {

          let start = element.startTime          
          let dateF = moment(start).utc().format()             
          
          if(moment(start).isAfter(last))            
            this.dateEnd = dateF                  
          
          last = dateF
        })                
      }        
        
      setTimeout(function(){
        self.updatingDates = false
        self.updatingClick = false
      })
    }
  }

  updateInputProfileVacation(){    
    this.updateInputProfileExpire()
  }

  lastMonth(){
    let next = new Date(moment(this.selectedDay).add(-1, 'month').format())
    let month = moment(this.selectedDay).add(-1, 'month').format("MMMM")    
    this.selectedDay = next
    this.calendar.currentDate =  next
    this.selectedMonth  = month
    this.onViewTitleChanged(this.selectedMonth)
  }

  nextMonth(){
    let next = new Date(moment(this.selectedDay).add(1, 'month').format())
    let month = moment(this.selectedDay).add(1, 'month').format("MMMM")    
    this.selectedDay = next
    this.calendar.currentDate =  next
    this.selectedMonth  = month
    this.onViewTitleChanged(this.selectedMonth)
  }
  
  dataStartChanged(){

    if(!this.updatingDates && !this.updatingClick){      

      this.updatingDates = true

      this.restartCalendar()

      this.dateEnd = ""           

      let startDate = new Date(moment(this.dateStart).utc().format("YYYY-MM-DDThh:mm:ss"))

      startDate.setHours(0, 1, 0)

      if(this.selectedAccessType === this.dataInfo.titleProfileDatetime){

        let h = this.hourStart.substring(0, 2);
        let m = this.hourStart.substring(3, 5);
        let s = this.hourStart.substring(6, 8);

        startDate.setHours(h)
        startDate.setMinutes(m)
        startDate.setSeconds(s)        
      }   
                    
      this.selectedDay = startDate      
      let ev = []    
      
      this.checkAccessType(ev)         
    }     
  }

  dataEndChanged(){            

    if(! this.updatingDates && !this.updatingClick && this.dateEnd.length > 0){
      
      if(moment(this.dateStart).isValid()){

       this.updatingDates = true
       this.shiftClicked = true
    
        if(moment(this.dateEnd).isBefore(moment(this.dateStart))){                    
          this.dateEnd = ""
  
      } else 
          this.dataEndChangedContinue()        
        
      }      
    }    
    
    this.updatingDates = false
    this.shiftClicked = false
  }

  dataEndChangedContinue(){  

    let tmpdate = this.selectedDay

      if(this.dateStart.length > 0){

        let endDate = this.parseTimestamp(moment(this.dateEnd))      

        if(this.selectedAccessType === this.dataInfo.titleProfileDatetime){

          let h = this.hourEnd.substring(0, 2);
          let m = this.hourEnd.substring(3, 5);
          let s = this.hourEnd.substring(6, 8);

          endDate.setHours(h)
          endDate.setMinutes(m)
          endDate.setSeconds(s)
        }
                    
        else 
          endDate.setHours(0, 0, 1)                    

        this.selectedDay = endDate
        
        let ev = []
        this.checkAccessType(ev)   
  
      } 
      else 
        this.dateEnd = ""
    

    this.selectedDay = tmpdate

  }

  hourStartChanged(){
    if(this.selectedAccessType == this.dataInfo.titleProfileDayweek){

    }
  }

  hourEndChanged(){
    if(this.selectedAccessType == this.dataInfo.titleProfileDayweek){
    }

  }
  
}