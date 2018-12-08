import { Component } from '@angular/core';
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

  name: string;
  desc: string;
  loadProfile: Boolean = false
  copyProfile: Boolean = false

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  datesWeek = []

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

  calendar = {
    mode: 'month',
    currentDate: new Date()            
  };

  constructor(public navCtrl: NavController, 
    public httpd: HttpdProvider, 
    public uiUtils: UiUtilsProvider,    
    public dataInfo: DataInfoProvider,
    public modalCtrl: ModalController,
    public events: Events,
    public navParams: NavParams) {        
  }

  ionViewDidLoad() {      
    this.loadProfile = this.navParams.get('loadProfile')
    this.profile = this.navParams.get('profile')
    this.copyProfile = this.navParams.get('copyProfile')
    this.getAccessTypes()          
  }

  getAccessTypes(){
    this.accessTypes = this.httpd.getAccessControlTypes()
    this.accessTypes.subscribe(data => {    

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
    else   
      this.loadWeekdaysProfile()    
  }

  loadProfileInfo(){
  
    this.name = this.profile.name
    this.desc = this.profile.description
    this.selectedAccessType = this.profile.type    

    let type = this.profile.id_type
    console.log(type)

    if(type === 1)
      this.loadDatesProfileExpire()
    else if(type === 2)
      this.loadDatesProfileDatetime()      
    else   
      this.loadWeekdaysProfile()    
  }

  loadDatesProfileExpire(){    
    let idProfile = this.profile.id

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileExpireContinue(data)
    })
  }

  loadDatesProfileExpireContinue(data){    
    
    this.calendarDisabled = true     
    let events = this.eventSource;

    data.success.forEach(element => {

      let datetime_start = new Date(element.datetime_start)
      let datetime_end = new Date(element.datetime_end)

      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente'}
      
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

      let datetime_start = new Date(element.datetime_start)
      let datetime_end = new Date(element.datetime_end)
      let event = { startTime: datetime_start, endTime: datetime_end, title: 'Carregado automaticamente'}
      
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

  loadWeekdaysProfile(){

    let idProfile = this.profile.id
    
    console.log(idProfile)

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadWeekdaysProfileContinue(data)
    })
  }

  loadWeekdaysProfileContinue(data){

    this.calendarDisabled = true
    console.log(data)     

    data.success.forEach(element => {
      this.populateDaysweek(element)      
    });    

    setTimeout( () => {
      this.calendarDisabled = false
    }, 1000);

  }

  populateDaysweek(element){
    let datetime_start = new Date(element.datetime_start)
    let datetime_end = new Date(element.datetime_end)
    let idDay = element.id_day

    if(idDay === 1){
      this.sunday = true
      this.sundayStart = new Date(datetime_start).toISOString()
      this.sundayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 2){
      this.monday = true
      this.mondayStart = new Date(datetime_start).toISOString()
      this.mondayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 3){
      this.tuesday = true
      this.tuesdayStart = new Date(datetime_start).toISOString()
      this.tuesdayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 4){
      this.wednesday = true
      this.wednesdayStart = new Date(datetime_start).toISOString()
      this.wednesdayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 5){
      this.thursday = true
      this.thursdayStart = new Date(datetime_start).toISOString()
      this.thursdayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 6){
      this.friday = true
      this.fridayStart = new Date(datetime_start).toISOString()
      this.fridayEnd = new Date(datetime_end).toISOString()
    }

    if(idDay === 7){
      this.saturday = true
      this.saturdayStart = new Date(datetime_start).toISOString()
      this.saturdayEnd = new Date(datetime_end).toISOString()
    }        
  }
     
  onTimeSelected(ev) {     
    
    if(! this.calendarDisabled){

      this.selectedDay = ev.selectedTime;
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
        
      this.lastSelectedAccessType = this.selectedDay
    }    
  }

  checkAccessType(ev){
    if(this.selectedAccessType === this.dataInfo.titleProfileExpire)
      this.confirmExpiration(ev)    

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.confirmDatetime(ev)    
  }

  confirmExpiration(ev){
    let total = this.eventSource.length

    if(total >= 2)
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titlePleaseUnselect).present()      
    else 
      this.confirmExpirationFinish(ev)          
  }
  
  confirmExpirationFinish(ev){
    let total = this.eventSource.length
    let startOrEnd =  total === 0
    let checkOk = true;

    if(!startOrEnd){
      let date0 = this.eventSource[0].startTime
      let isBefore = moment(this.selectedDay).isBefore(moment(date0))

      if(isBefore){
        checkOk = false
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateEndBeforeDateStart).present()
      }
    }

    if(checkOk){

      let msg = startOrEnd ? this.dataInfo.titleConfirmStart : this.dataInfo.titleConfirmEnd
        
      this.uiUtils.showConfirm(this.dataInfo.titleSelect, msg).then(data => {      
  
        if(data)
          this.addExpiration(ev)     
      })
    }
    
  }

  addExpiration(ev){        
    this.addEvent()
  }  

  confirmDatetime(ev){    
    this.addEvent()    
  }

  addEvent(){
    this.calendarDisabled = true
    
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];

        setTimeout(() => {
          this.eventSource = events;
          
          setTimeout( () => {
            this.calendarDisabled = false
          }, 1000)
        });
      }
    });
  }  

  addProfile(){
    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.addProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.addProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.addProfileDayWeek()
  }

  addProfileDateTimes() {    
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()
      
      this.httpd.addAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', 1);
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()        
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
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateendGreaterDateStart).present()      
      this.restartCalendar()

    } else {

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.addAccessProfileExpire(this.name, this.desc, this.selectedAccessType, start0F, end0F, start1F, end1F)    
      .subscribe( () => {

        loading.dismiss()

        this.navCtrl.pop()
        this.events.publish('refreshProfiles', 1);
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()        
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

      } else {
        this.datesWeek.push({id: 2, startTime: this.mondayStart, endTime: this.mondayEnd})
      }
    }      
    
    if(this.tuesday){
      let tuesdayIsBefore = moment(this.tuesdayEnd).isBefore(moment(this.tuesdayStart))

      if(tuesdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckTuesday).present()
        return false

      } else {
        this.datesWeek.push({id: 3, startTime: this.tuesdayStart, endTime: this.tuesdayEnd})
      }
    }
      
    if(this.wednesday){
      let wednesdayIsBefore = moment(this.wednesdayEnd).isBefore(moment(this.wednesdayStart))

      if(wednesdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckWednesday).present()
        return false

      } else {
        this.datesWeek.push({id: 4, startTime: this.wednesdayStart, endTime: this.wednesdayEnd})
      }
    }      

    if(this.thursday){
      let thursdayIsBefore = moment(this.thursdayEnd).isBefore(moment(this.thursdayStart))

      if(thursdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckThursday).present()
        return false

      } else {
        this.datesWeek.push({id: 5, startTime: this.thursdayStart, endTime: this.thursdayEnd})
      }
    }
      
    if(this.friday){

      let fridayIsBefore = moment(this.fridayEnd).isBefore(moment(this.fridayStart))

      if(fridayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckFriday).present()
        return false

      } else {
        this.datesWeek.push({id: 6, startTime: this.fridayStart, endTime: this.fridayEnd})
      }
    }
      
    if(this.saturday){

      let saturdayIsBefore = moment(this.saturdayEnd).isBefore(moment(this.saturdayStart))

      if(saturdayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckSaturnday).present()
        return false

      } else {
        this.datesWeek.push({id: 7, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
      }
    }
     
    if(this.sunday){

      let sundayIsBefore = moment(this.sundayEnd).isBefore(moment(this.sundayStart))

      if(sundayIsBefore){        
        this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleCheckSunday).present()
        return false
      } else {
        this.datesWeek.push({id: 7, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
      }
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
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()        
      })
  }

  updateProfile(){
    console.log('updateProfile', this.selectedAccessType)

    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.updateProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.updateProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.updateProfileDayWeek()
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
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()
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
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()        
      })
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
          this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()        
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

  applyTime(){
    console.log('applyTime')
  }

}
