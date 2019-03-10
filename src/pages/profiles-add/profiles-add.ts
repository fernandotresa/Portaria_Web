import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
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
  profile: any

  hasDatetime: Boolean = false
  hasDate: Boolean = true

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

  monday: Boolean = false;
  mondayStart: string = new Date().toISOString();
  mondayEnd: string = new Date().toISOString();

  tuesday: Boolean = false;
  tuesdayStart: string = new Date().toISOString();
  tuesdayEnd: string = new Date().toISOString();

  wednesday: Boolean = false;
  wednesdayStart: string = new Date().toISOString();
  wednesdayEnd: string = new Date().toISOString();

  thursday: Boolean = false;
  thursdayStart: string = new Date().toISOString();
  thursdayEnd: string = new Date().toISOString();

  friday: Boolean = false;
  fridayStart: string = new Date().toISOString();
  fridayEnd: string = new Date().toISOString();

  saturday: Boolean = false;
  saturdayStart: string = new Date().toISOString();
  saturdayEnd: string = new Date().toISOString();

  sunday: Boolean = false;   
  sundayStart: string = new Date().toISOString();
  sundayEnd: string = new Date().toISOString();

  accessTypes: Observable<any>;
  selectedAccessType: string
  lastSelectedAccessType = new Date();
  
  dateStart: any
  dateEnd: any

  shiftClicked: Boolean = false

  calendar = {
    mode: 'month',
    locale: 'pt',
    currentDate: new Date()            
  };

  colors: string[] = ['primary', 'warning', 'danger', 'success'];

  @HostListener('document:keydown.Shift', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.shiftClicked = true
  }

  @HostListener('document:keyup.Shift', ['$event']) onKeyupHandler(event: KeyboardEvent) {    
    this.shiftClicked = false   
  }

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public navParams: NavParams) {  

      moment.locale('pt-br');       
  }

  ionViewDidLoad() {      
    this.loadProfile = this.navParams.get('loadProfile')
    this.profile = this.navParams.get('profile')
    this.copyProfile = this.navParams.get('copyProfile')   

    this.selectedType = this.navParams.get('selectedType')    
    let selectedTypeName = this.navParams.get('selectedTypeName')    

    if(selectedTypeName){
      this.selectedAccessType = selectedTypeName
    }
      
    this.getAccessTypes()    
    this.selectedMonth  = moment(this.selectedDay).format("MMMM")    
    this.onViewTitleChanged(this.selectedMonth)
  }

  ngAfterViewInit() {
    var me = this;
    setTimeout(function() {
        me.lockSwipe = true;
    },1000);
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

  copyProfileInfo(){
    this.name = this.profile.name + this.dataInfo.titleCopyProfile
    this.desc = this.profile.description + this.dataInfo.titleCopyProfile
    this.selectedAccessType = this.profile.type    

    let type = this.profile.id_type

    if(type === 1)    
      this.loadDatesProfileExpire()

    else if(type === 2)    
      this.loadDatesProfileDatetime()      

    else if(type === 3)    
      this.loadWeekdaysProfile()

    else if(type === 4)    
      this.loadVacationsProfile()
  }

  loadProfileInfo(){

    this.name = this.profile.name
    this.desc = this.profile.description
    this.selectedAccessType = this.profile.type     

    let type = this.profile.id_type

    if(type === 1)    
      this.loadDatesProfileExpire()

    else if(type === 2)    
      this.loadDatesProfileDatetime()      

    else if(type === 3)    
      this.loadWeekdaysProfile()

    else if(type === 4)    
      this.loadVacationsProfile()
  }

  loadDatesProfileExpire(){    
    let idProfile = this.profile.id

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileExpireContinue(data)
    })
  }

  getColorStatus(col: number){   
    let color = 'primary'  
    return color;
  }

  loadDatesProfileExpireContinue(data){    
    
    this.calendarDisabled = true     
    let events = this.eventSource;

    let total = data.success.length
    let atual = 0

    data.success.forEach(element => {

      let dateS = moment(element.datetime_start).utc().format()
      let dateF = moment(element.datetime_end).utc().format()

      let datetime_start = this.parseTimestamp(dateS)
      let datetime_end = new Date(dateF)

      this.dateStart = dateS
      this.dateEnd = dateF      

      let colorS = this.getColorStatus(1)

      if(total === atual)
        colorS = this.getColorStatus(0)

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente',  color: colorS}      
      events.push(event);
      atual++
    });  
    
    this.eventSource = []

    setTimeout(() => {
      this.eventSource = events;
      
      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }

  loadDatesProfileDatetime(){    
    let idProfile = this.profile.id

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

      let datetime_start = this.parseTimestamp(dateS)    
      let datetime_end = new Date(dateF)

      this.dateEnd = dateF

      let colorS = this.getColorStatus(1)

      if(total === atual)
        colorS = this.getColorStatus(0)
     
      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: colorS}      
      events.push(event);

      atual++
    });  
    
    this.eventSource = []

    setTimeout(() => {
      this.eventSource = events;
      
      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }

  parseTimestamp(timestampStr) {
    return new Date(new Date(timestampStr).getTime() + (new Date().getTimezoneOffset() * 60 * 3000));
  };

  parseTimestampEnd(timestampStr) {
    return new Date(new Date(timestampStr).getTime() - (new Date().getTimezoneOffset() * 60 * 3000));
  };

  loadWeekdaysProfile(){

    let idProfile = this.profile.id
    
    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadWeekdaysProfileContinue(data)
    })
  }

  loadWeekdaysProfileContinue(data){

    this.calendarDisabled = true

    data.success.forEach(element => {
      this.populateDaysweek(element)      
    });    

    setTimeout( () => {
      this.calendarDisabled = false
    }, 1000);
  }

  populateDaysweek(element){

    let datetime_start = moment(element.datetime_start).utc().format()
    let datetime_end = moment(element.datetime_end).utc().format()
    let idDay = element.id_day      

    if(idDay === 1){
      this.monday = true
      this.mondayStart = datetime_start
      this.mondayEnd = datetime_end
    }

    if(idDay === 2){
      this.tuesday = true
      this.tuesdayStart = datetime_start
      this.tuesdayEnd = datetime_end
    }

    if(idDay === 3){
      this.wednesday = true
      this.wednesdayStart = datetime_start
      this.wednesdayEnd = datetime_end
    }

    if(idDay === 4){
      this.thursday = true
      this.thursdayStart = datetime_start
      this.thursdayEnd = datetime_end
    }

    if(idDay === 5){
      this.friday = true
      this.fridayStart = datetime_start
      this.fridayEnd = datetime_end
    }

    if(idDay === 6){
      this.saturday = true
      this.saturdayStart = datetime_start
      this.saturdayEnd = datetime_end
    }      
    
    if(idDay === 7){
      this.sunday = true
      this.sundayStart = datetime_start
      this.sundayEnd = datetime_end
    }
  }

  loadVacationsProfile(){    
    this.loadDatesProfileExpire()
  }
     
  onTimeSelected(ev) {            
        
    this.selectedMonth  = moment(this.selectedDay).format("MMMM")
    this.onViewTitleChanged(this.selectedMonth)

    if(! this.calendarDisabled)
      this.onTimeSelectedContinue(ev)          
  }

  onTimeSelectedContinue(ev){

    this.selectedDay = ev.selectedTime;    

    if(this.shiftClicked)
      this.onTimeSelectedContinueShift(ev)      
    else
      this.onTimeSelectedContinueNormal(ev)
      
    this.lastSelectedAccessType = this.selectedDay
  }

  onTimeSelectedContinueShift(ev){
    
    let refresh = true

    let dayClicked = new Date(this.selectedDay)                

    for(let i = 0; i < this.eventSource.length; ++i){
      
      let day = new Date(this.eventSource[i].startTime)
      let isSame = moment(day).isSame(dayClicked, 'day')    

      if(isSame){
        this.calendarDisabled = true        
        this.eventSource.splice(i, 1);
        refresh = false
        this.refreshCalendar()     
      }
    }
    
    if(refresh)
      this.checkAccessType(ev)       
  }

  onTimeSelectedContinueNormal(ev){    

    if(this.lastSelectedAccessType == this.selectedDay){

      let refresh = true

      let dayClicked = new Date(this.selectedDay)                

      for(let i = 0; i < this.eventSource.length; ++i){
        
        let day = new Date(this.eventSource[i].startTime)
        let isSame = moment(day).isSame(dayClicked, 'day')    
        console.log(isSame)

        if(isSame){
          this.calendarDisabled = true
          this.eventSource.splice(i, 1);
          refresh = false
        }
      }
      
      if(refresh)
      this.checkAccessType(ev)  

    }        
  }

  checkAccessType(ev){
    
    if(this.selectedAccessType === this.dataInfo.titleProfileExpire)
      this.confirmExpiration(ev)    

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.confirmDatetime(ev)    

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.confirmExpiration(ev)    
  }

  confirmExpiration(ev){
    let total = this.eventSource.length

    if(total > 1){

      this.uiUtils.showConfirm(this.dataInfo.titleWarning, this.dataInfo.titlePleaseUnselect).then(data => {      
          
        if(data){          
          this.eventSource.pop()
          this.addExpiration(ev)
        }       
      })         
         
    } else     
      this.confirmExpirationFinish(ev)          
      
  }
  
  confirmExpirationFinish(ev){

    let checkOk = this.checkDatesExpiration()    
        
    if(checkOk)
      this.addExpiration(ev)        
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
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateEndBeforeDateStart).present()
      }      
    }  

    return checkOk;
  }

  addEvent(){
    this.calendarDisabled = true
    
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {

      if (data) {
        this.addEventDatetime(data) 

      } else {      
        this.calendarDisabled = false
      }
    });
  }


  addEventDatetime(data){    

    let eventData = data
    eventData.startTime = this.parseTimestamp(data.startTime);
    eventData.endTime = this.parseTimestamp(data.endTime);

    let events = this.eventSource;
    events.push(eventData);
    
    this.eventSource = [];
    let self = this

    setTimeout(() => {
      this.eventSource = events;
      
      setTimeout( () => {
        self.calendarDisabled = false
        self.updateInputs()
      }, 1000)
    });

  }
  
  addEventDate(){    
    if(this.shiftClicked)
      this.addEventDateShift()
    else 
      this.addEventDateNormal()
  }

  addEventDateNormal(){    

    if(moment(this.selectedDay).isValid()){

      this.calendarDisabled = true     
      let events = this.eventSource;
      
      let start = moment(this.selectedDay).utc().startOf('day').format()
      let end = moment(this.selectedDay).utc().endOf('day').format()
      
      let startDate = this.parseTimestamp(start)    
      let endDate = this.parseTimestampEnd(end)
      
      if(this.selectedAccessType === this.dataInfo.titleProfileExpire){

        if(events.length === 1){
          events[0].endTime = endDate
        }
      }

      let colorS = this.getColorStatus(1)
      
      let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente',  color: colorS}        
      
      events.push(event);     
    
      this.eventSource = []
      let self = this

      setTimeout(() => {
        self.eventSource = events;
        
          setTimeout( () => {
            self.calendarDisabled = false
            self.updateInputs()
          }, 1000)
        
        })
    }    
  }

  addEventDateShift(){    

    if(moment(this.selectedDay).isValid()){
      
      this.calendarDisabled = true     
      let events = this.eventSource;    

      let start = moment(this.selectedDay).utc().startOf('day').format()
      let end = moment(this.selectedDay).utc().endOf('day').format()

      let startDate = this.parseTimestamp(start)
      let endDate = this.parseTimestampEnd(end)

      this.updateInputs()
      let colorS = this.getColorStatus(1)

      let event = { startTime: startDate, endTime: endDate, 
        title: 'Carregado automaticamente',  color: colorS}    

      events.push(event);     
    
      this.eventSource = []

      if(events.length === 2){     

        let a = events[0].startTime      

        for (var m = moment(a); m.isBefore(endDate); m.add(1, 'days')) {

          let startB = moment(m).utc().startOf('day').format()
          let endB = moment(m).utc().endOf('day').format()

          let startDateB = this.parseTimestamp(startB)
          let endDateB = this.parseTimestampEnd(endB)

          let eventB = { startTime: startDateB, endTime: endDateB, 
            title: 'Carregado automaticamente',  color: colorS}    

          events.push(eventB);
        }
      }

      setTimeout(() => {
        this.eventSource = events;
        
        setTimeout( () => {
          this.calendarDisabled = false
        }, 1000)
        
        })

    }    
  }

  addExpiration(ev){     
    if(this.hasDatetime)     
      this.addEvent()

    else  
      this.addEventDate()
  } 

  confirmDatetime(ev){  

    if(this.hasDatetime)     
      this.addEvent()
    else  
      this.addEventDate()
  }  

  addProfile(){
    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.addProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.addProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.addProfileDayWeek()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.addProfileVacation()
  }

  addProfileDateTimes() {    
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()
      
      this.httpd.addAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
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
      
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateendGreaterDateStart)
      .present()      
      this.restartCalendar()

    } else {

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.addAccessProfileExpire(this.name, this.desc, this.selectedAccessType, 
        start0F, end0F, start1F, end1F)    

      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()

        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
    }    
  }  

  populateDayweekData(){
    this.datesWeek = []

    if(this.monday){
      
      let mondayIsBefore = moment(this.mondayEnd).isBefore(moment(this.mondayStart))      

      if(mondayIsBefore){        
          this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckMonday).present()
          return false

      } else 
        this.datesWeek.push({id: 1, startTime: this.mondayStart, endTime: this.mondayEnd})      
    }      
    
    if(this.tuesday){
      let tuesdayIsBefore = moment(this.tuesdayEnd).isBefore(moment(this.tuesdayStart))

      if(tuesdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckTuesday).present()
        return false

      } else 
        this.datesWeek.push({id: 2, startTime: this.tuesdayStart, endTime: this.tuesdayEnd})    
    }
      
    if(this.wednesday){
      let wednesdayIsBefore = moment(this.wednesdayEnd).isBefore(moment(this.wednesdayStart))

      if(wednesdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckWednesday).present()
        return false

      } else 
        this.datesWeek.push({id: 3, startTime: this.wednesdayStart, endTime: this.wednesdayEnd})  
    }      

    if(this.thursday){
      let thursdayIsBefore = moment(this.thursdayEnd).isBefore(moment(this.thursdayStart))

      if(thursdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckThursday).present()
        return false

      } else 
        this.datesWeek.push({id: 4, startTime: this.thursdayStart, endTime: this.thursdayEnd})    
    }
      
    if(this.friday){

      let fridayIsBefore = moment(this.fridayEnd).isBefore(moment(this.fridayStart))

      if(fridayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckFriday).present()
        return false

      } else 
        this.datesWeek.push({id: 5, startTime: this.fridayStart, endTime: this.fridayEnd})    
    }
      
    if(this.saturday){

      let saturdayIsBefore = moment(this.saturdayEnd).isBefore(moment(this.saturdayStart))

      if(saturdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckSaturnday).present()
        return false

      } else
        this.datesWeek.push({id: 6, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
    }
     
    if(this.sunday){

      let sundayIsBefore = moment(this.sundayEnd).isBefore(moment(this.sundayStart))

      if(sundayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckSunday).present()
        return false
      } else 
        this.datesWeek.push({id: 7, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
      
    }

    return true
  }

  addProfileDayWeek(){
    if(this.populateDayweekData())
      this.addProfileDayWeekContinue(this.datesWeek)      
  }

  addProfileDayWeekContinue(data){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.addAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, data)
      .subscribe( () => {

        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })
  }

  addProfileVacation(){
    this.addProfileExpire()
  }

  updateProfile(){
    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.updateProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.updateProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.updateProfileDayWeek()

    else if(this.selectedAccessType == this.dataInfo.titleProfileVacation)
      this.updateProfileVacation()
  }

  updateProfileExpire(){
    let start0 = this.eventSource[0].startTime
    let end0 = this.eventSource[0].endTime

    let start1 = this.eventSource[1].endTime
    let end1 = this.eventSource[1].endTime

    let start0F = moment(start0)
    let start1F = moment(start1)

    if(start1F.isBefore(start0F)){
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateendGreaterDateStart)
      .present()      

      this.restartCalendar()

    } else {

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      
      loading.present()        

      this.httpd.updateAccessProfileExpire(this.name, this.desc, this.selectedAccessType, 
        start0, end0, this.profile.id, start1, end1)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.profile.id_type);
        this.uiUtils.showAlertSuccess()
      })
    }
  }

  updateProfileDateTimes(){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.updateAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource, this.profile.id)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.profile.id_type);
        this.uiUtils.showAlertSuccess()
      })
  }

  updateProfileVacation(){
    this.updateProfileExpire()
  }

  updateProfileDayWeek(){        

    if(this.populateDayweekData()){

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
  
      this.httpd.updateAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, this.datesWeek, this.profile.id)
        .subscribe( () => {
  
          loading.dismiss()        
          this.navCtrl.pop()
          this.events.publish('refreshProfiles', this.profile.id_type);
          this.uiUtils.showAlertSuccess()
        })
    }    
  }

  restartCalendar(){    
      this.calendarDisabled = true      
      this.eventSource.splice(0, this.eventSource.length)            
      this.refreshCalendar()   
  }

  refreshCalendar(){
    let events = this.eventSource;      
    this.eventSource = [];

    setTimeout(() => {    
      this.eventSource = events;      
      
      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }

  calendarDateClicked(){
    
    if(this.hasDatetime)
      this.hasDatetime = false

    if(! this.hasDate && ! this.hasDatetime)

      this.hasDate = true
  }

  calendarDatetimeClicked(){
    
    if(this.hasDate)
      this.hasDate = false
    
    if(! this.hasDate && ! this.hasDatetime)
      this.hasDate = true
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

  dataStartChanged(){

    if(! this.updatingDates && !this.updatingClick){

      this.updatingDates = true
      this.restartCalendar()    
      this.dateEnd = ""
      let dateS = this.parseTimestamp(this.dateStart)
      this.selectedDay = dateS

      let ev = []
      
      this.checkAccessType(ev)   
      this.updatingDates = false
    }
     
  }

  dataEndChanged(){  
    
    if(! this.updatingDates && !this.updatingClick){


      this.updatingDates = true

      if(this.dateStart.length > 0){

        let dateS = this.parseTimestamp(this.dateEnd)        

        this.selectedDay = dateS  
        let ev = []
        this.checkAccessType(ev)   
  
      } 
      else {
        this.dateEnd = ""
      }

      this.updatingDates = false

    }             
  }

  clearCal(){
    this.dateEnd = ""
    this.dateStart = ""

    this.restartCalendar()
    this.eventSource = [];    

    let self = this

    setTimeout(function(){            
      self.viewTitle = moment().format()        
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
        let dateS = moment(start).utc().format()             
        this.dateStart = dateS        
      }
        
      if(total > 1){        

        let start = this.eventSource[1].endTime
        let dateF = moment(start).utc().format()             
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
  
  

}
