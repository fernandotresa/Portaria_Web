import { Component, HostListener } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment-timezone';

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
  selectedDay = new Date();

  datesWeek = []  

  selectedMonth: string;

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
    this.getAccessTypes()    
    this.selectedMonth  = moment(this.selectedDay).format("MMMM")
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

    else   
      console.log("Tipo de profile não configurado", type)
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

    else   
      console.log("Tipo de profile não configurado", type)
  }

  loadDatesProfileExpire(){    
    let idProfile = this.profile.id

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileExpireContinue(data)
    })
  }

  getColorStatus(){    
    let color = 'primary'
    return color;
  }


  loadDatesProfileExpireContinue(data){    
    
    this.calendarDisabled = true     
    let events = this.eventSource;

    data.success.forEach(element => {

      let dateS = moment(element.datetime_start).tz('America/Sao_Paulo').format()
      let dateF = moment(element.datetime_end).tz('America/Sao_Paulo').format()

      let datetime_start = new Date(dateS)
      let datetime_end = new Date(dateF)

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: this.getColorStatus()}      
      events.push(event);
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

    data.success.forEach(element => {

      let dateS = moment(element.datetime_start).tz('America/Sao_Paulo').format()
      let dateF = moment(element.datetime_end).tz('America/Sao_Paulo').format()

      let datetime_start = this.parseTimestamp(dateS)
      let datetime_end = this.parseTimestamp(dateF)

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente', color: this.getColorStatus()}      
      events.push(event);
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
    return new Date(timestampStr);
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

    let datetime_start = moment(element.datetime_start).tz('America/Sao_Paulo').format()
    let datetime_end = moment(element.datetime_end).tz('America/Sao_Paulo').format()
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

    let refresh = true

    if(this.lastSelectedAccessType == this.selectedDay){

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

    if(total >= 2){

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
    let total = this.eventSource.length
    let start =  total === 0
        
    if(checkOk){

      let msg = start ? this.dataInfo.titleConfirmStart : this.dataInfo.titleConfirmEnd
        
      this.uiUtils.showConfirm(this.dataInfo.titleSelect, msg).then(data => {      
  
        if(data)
          this.addExpiration(ev)
         
      })
    }   
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
    eventData.startTime = new Date(data.startTime);
    eventData.endTime = new Date(data.endTime);

    let events = this.eventSource;
    events.push(eventData);
    
    this.eventSource = [];
    let self = this

    setTimeout(() => {
      this.eventSource = events;
      
      setTimeout( () => {
        self.calendarDisabled = false
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

    this.calendarDisabled = true     
    let events = this.eventSource;
    
    let start = moment(this.selectedDay).tz('America/Sao_Paulo').startOf('day').add(1, 'minutes').format()
    let end = moment(this.selectedDay).tz('America/Sao_Paulo').endOf('day').format()

    let startDate = new Date(start)
    let endDate = new Date(end)

    if(this.selectedAccessType === this.dataInfo.titleProfileExpire){

      if(events.length === 1){
        events[0].endTime = endDate
      }
    }
    
    let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente', color: this.getColorStatus()}        
    
    events.push(event);     
  
    this.eventSource = []

    setTimeout(() => {
      this.eventSource = events;
      
      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
      
      })
  }

  addEventDateShift(){    

    this.calendarDisabled = true     
    let events = this.eventSource;    

    let start = moment(this.selectedDay).tz('America/Sao_Paulo').startOf('day').add(1, 'minutes').format()
    let end = moment(this.selectedDay).tz('America/Sao_Paulo').endOf('day').format()

    let startDate = new Date(start)
    let endDate = new Date(end)

    let event = { startTime: startDate, endTime: endDate, title: 'Carregado automaticamente', color: this.getColorStatus()}    
    events.push(event);     
  
    this.eventSource = []

    if(events.length === 2){     

      let a = events[0].startTime      

      for (var m = moment(a); m.isBefore(endDate); m.add(1, 'days')) {

        let startB = moment(m).tz('America/Sao_Paulo').startOf('day').add(1, 'minutes').format()
        let endB = moment(m).tz('America/Sao_Paulo').endOf('day').format()

        let startDateB = new Date(startB)
        let endDateB = new Date(endB)

        let eventB = { startTime: startDateB, endTime: endDateB, title: 'Carregado automaticamente', color: this.getColorStatus()}    
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

  addExpiration(ev){ 

    console.log(ev)
    
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
        this.events.publish('refreshProfiles', 1);
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
        this.events.publish('refreshProfiles', 1); 
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
        this.events.publish('refreshProfiles', 1);
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

    let start1 = this.eventSource[1].startTime
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
        this.events.publish('refreshProfiles', 1);
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
        this.events.publish('refreshProfiles', 1);
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
          this.events.publish('refreshProfiles', 1);
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
    let month = moment(event).format("MMMM")
    this.onViewTitleChanged(month)
  }

  dataStartChanged(){
    console.log(this.dateStart)
  }

  dataEndChanged(){
    console.log(this.dateEnd)
  }

  
  

}
