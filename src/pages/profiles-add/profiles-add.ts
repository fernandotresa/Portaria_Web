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

  name: string;
  desc: string;

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
    this.accessTypes = this.httpd.getAccessControlTypes()
    this.accessTypes.subscribe(data => {
      console.log(data)

    })

    this.name = "Teste"
    this.desc = "Desc Teste"    
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
    if(this.selectedAccessType === 'Vencimento')
      this.confirmExpiration(ev)    

    else if(this.selectedAccessType == 'Datas específicas + horários')
      this.confirmDatetime(ev)    
  }

  confirmExpiration(ev){
    let total = this.eventSource.length
    if(total >= 2)
      this.uiUtils.showAlert("Atenção", "Favor desmarcar os dias selecionados").present()      
    else 
      this.confirmExpirationFinish(ev)          
  }
  
  confirmExpirationFinish(ev){
    let total = this.eventSource.length
    let startOrEnd =  total === 0
    let msg = startOrEnd ? "Confirmar data inicial?" : "Confirmar data final?"
        
    this.uiUtils.showConfirm('Selecionar', msg).then(data => {      

      if(data){
        this.addExpiration(ev)                 
      }
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
    if(this.selectedAccessType == 'Vencimento')
      this.addProfileExpire()

    else if(this.selectedAccessType == 'Datas específicas + horários')
      this.addProfileDateTimes()

    else if(this.selectedAccessType == 'Dias da Semana + horários')
      this.addProfileDayWeek()
  }

  addProfileDateTimes() {    
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
      
      this.httpd.addAccessProfileDatetime(this.name, this.desc, this.selectedAccessType, this.eventSource)    
      .subscribe( () => {

        loading.dismiss()

        this.uiUtils.showAlert("Sucesso", "Perfil criado").present()
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

        this.uiUtils.showAlert("Sucesso", "Perfil criado").present()
        .then( () => {        
          //this.navCtrl.pop()        
        })
      })
    }    
  }

  addProfileDayWeek(){
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


    this.addProfileDayWeekContinue(data)      
  }

  addProfileDayWeekContinue(data){
    let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.addAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, data)
      .subscribe( () => {

        loading.dismiss()
        

        this.uiUtils.showAlert("Sucesso", "Perfil criado").present()
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
