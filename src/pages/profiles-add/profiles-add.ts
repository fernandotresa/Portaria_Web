import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

    if(type < 3)
      this.loadDatesProfile()
    else   
      this.loadWeekdaysProfile() 
  }

  loadProfileInfo(){
  
    this.name = this.profile.name
    this.desc = this.profile.description
    this.selectedAccessType = this.profile.type    

    let type = this.profile.id_type

    if(type < 3)
      this.loadDatesProfile()
    else   
      this.loadWeekdaysProfile()    
  }

  loadDatesProfile(){    
    let idProfile = this.profile.id

    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadDatesProfileContinue(data)
    })
  }

  loadDatesProfileContinue(data){    
    
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

      if(this.lastSelectedAccessType == this.selectedDay)
        this.checkAccessType(ev)                      
        
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
    let msg = startOrEnd ? this.dataInfo.titleConfirmStart : this.dataInfo.titleConfirmEnd
        
    this.uiUtils.showConfirm(this.dataInfo.titleSelect, msg).then(data => {      

      if(data)
        this.addExpiration(ev)     
    })
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

        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
  } 

  addProfileExpire(){    
    let start = this.eventSource[0].startTime
    let end = this.eventSource[1].endTime

    let startF = moment(start)
    let endF = moment(end)

    if(endF.isBefore(startF)){
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateendGreaterDateStart).present()      
      this.restartCalendar()

    } else {

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.addAccessProfileExpire(this.name, this.desc, this.selectedAccessType, start, end)    
      .subscribe( () => {

        loading.dismiss()

        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
    }    
  }

  populateDayweekData(){
    let data = []

    if(this.monday)
      data.push({id: 2, startTime: this.mondayStart, endTime: this.mondayEnd})
    
    if(this.tuesday)
      data.push({id: 3, startTime: this.tuesdayStart, endTime: this.tuesdayEnd})

    if(this.wednesday)
      data.push({id: 4, startTime: this.wednesdayStart, endTime: this.wednesdayEnd})

    if(this.thursday)
      data.push({id: 5, startTime: this.thursdayStart, endTime: this.thursdayEnd})

    if(this.friday)
      data.push({id: 6, startTime: this.fridayStart, endTime: this.fridayEnd})

    if(this.saturday)
      data.push({id: 7, startTime: this.saturdayStart, endTime: this.saturdayEnd})

    if(this.monday)
      data.push({id: 1, startTime: this.mondayStart, endTime: this.mondayEnd})

    return data
  }

  addProfileDayWeek(){
    let data = this.populateDayweekData()
    this.addProfileDayWeekContinue(data)      
  }

  addProfileDayWeekContinue(data){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.addAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, data)
      .subscribe( () => {

        loading.dismiss()
        
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileCreated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
  }

  updateProfile(){
    if(this.selectedAccessType ==  this.dataInfo.titleProfileExpire)
      this.updateProfileExpire()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDatetime)
      this.updateProfileDateTimes()

    else if(this.selectedAccessType == this.dataInfo.titleProfileDayweek)
      this.updateProfileDayWeek()
  }

  updateProfileExpire(){
    let start = this.eventSource[0].startTime
    let end = this.eventSource[1].endTime

    let startF = moment(start)
    let endF = moment(end)

    if(endF.isBefore(startF)){
      this.uiUtils.showAlert(this.dataInfo.titleWarning, this.dataInfo.titleDateendGreaterDateStart).present()      
      this.restartCalendar()

    } else {

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.updateAccessProfileExpire(this.name, this.desc, this.selectedAccessType, start, end, this.profile.id)    
      .subscribe( () => {

        loading.dismiss()

        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
    }
  }

  updateProfileDateTimes(){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.updateAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource, this.profile.id)    
      .subscribe( () => {

        loading.dismiss()

        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
  }

  updateProfileDayWeek(){
    console.log('updateProfileDayWeek')
    
    let data = this.populateDayweekData()

    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.updateAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, data, this.profile.id)
      .subscribe( () => {

        loading.dismiss()
        
        this.uiUtils.showAlert(this.dataInfo.titleSuccess, this.dataInfo.titleProfileUpdated).present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })

  }

  restartCalendar(){    
      this.calendarDisabled = true
      this.eventSource.splice(0, this.eventSource.length)            
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
