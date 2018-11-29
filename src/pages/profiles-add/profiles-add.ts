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

  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;   
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

      if(this.lastSelectedAccessType == this.selectedDay){
        this.checkAccessType(ev)                
      }
        
      this.lastSelectedAccessType = this.selectedDay
    }    
  }

  checkAccessType(ev){
    console.log('checkAccessType', this.selectedAccessType)

    if(this.selectedAccessType === 'Vencimento')
      this.confirmExpiration(ev)    

    else if(this.selectedAccessType == 'Datas específicas + horários')
      this.confirmDatetime(ev)
  }

  confirmExpiration(ev){

    console.log('confirmExpiration', ev)

    let total = this.eventSource.length
    if(total >= 2)
      this.uiUtils.showAlert("Atenção", "Favor desmarcar os dias selecionados").present()      
    else 
      this.confirmExpirationFinish(ev)
          
  }

  confirmDatetime(ev){    
    console.log('confirmDatetime', ev)
    
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
    let date = moment(ev.selectedTime).format()
    
    this.calendarDisabled = true
    let event = { startTime: new Date(date), endTime: new Date(date), allDay: true };

    let events = this.eventSource;
    events.push(event);    
    this.eventSource = [];

    setTimeout(() => {    
      this.eventSource = events;

      setTimeout( () => {
        this.calendarDisabled = false
      }, 1000)
    });
  }  

  addProfile(){
    if(this.selectedAccessType == 'Vencimento')
      this.addProfileExpire()

    else if(this.selectedAccessType == 'Datas específicas + horários')
      this.addProfileDateTimes()
  }

  addProfileDateTimes() {    
    console.log('addProfileDateTimes')

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
