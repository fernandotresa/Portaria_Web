import { Events } from 'ionic-angular';
import { HttpdProvider } from '../../providers/httpd/httpd';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { MomentsProvider } from '../../providers/moments/moments';
import { UiUtilsProvider } from '../../providers/ui-utils/ui-utils'

@Injectable()
export class DayweekUtilsProvider {

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

  
  hourStart: string;
  hourEnd: string;

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

  constructor(
    public httpd: HttpdProvider,
    public events: Events, 
    public moments: MomentsProvider,
    public uiUtils: UiUtilsProvider) {
  }


  setDateDefaultDayweeks(){
    this.mondayStart = this.moments.getStartDayStr()
    this.mondayEnd = this.moments.getEndDayStr()

    this.tuesdayStart = this.moments.getStartDayStr()
    this.tuesdayEnd = this.moments.getEndDayStr()

    this.wednesdayStart = this.moments.getStartDayStr()
    this.wednesdayEnd = this.moments.getEndDayStr()

    this.thursdayStart = this.moments.getStartDayStr()
    this.thursdayEnd = this.moments.getEndDayStr()

    this.fridayStart = this.moments.getStartDayStr()
    this.fridayEnd = this.moments.getEndDayStr()

    this.saturdayStart = this.moments.getStartDayStr()
    this.saturdayEnd = this.moments.getEndDayStr()

    this.sundayStart = this.moments.getStartDayStr()
    this.sundayEnd = this.moments.getEndDayStr()
  }

  hourStartChanged(){    
    this.mondayStart = this.hourStart      
    this.tuesdayStart = this.hourStart      
    this.wednesdayStart = this.hourStart      
    this.thursdayStart = this.hourStart      
    this.fridayStart = this.hourStart      
    this.saturdayStart = this.hourStart      
    this.sundayStart = this.hourStart          
  }

  hourEndChanged(){
    this.mondayEnd = this.hourEnd      
    this.tuesdayEnd = this.hourEnd      
    this.wednesdayEnd = this.hourEnd      
    this.thursdayEnd = this.hourEnd      
    this.fridayEnd = this.hourEnd      
    this.saturdayEnd = this.hourEnd      
    this.sundayEnd = this.hourEnd    
  }

  loadWeekdaysProfile(idProfile: number){    
    
    this.httpd.getProfileInfo(idProfile).subscribe(data => {
      this.loadWeekdaysProfileContinue(data)
    })
  }

  loadWeekdaysProfileContinue(data){

    this.calendarDisabled = true

    data.success.forEach(element => {
      //this.populateDaysweek(element)      
    });    

    setTimeout( () => {
      this.calendarDisabled = false
    }, 1000);
  }  

  

  populateDayweekData(){
    this.datesWeek = []

    if(this.monday){
      
      let mondayIsBefore = moment(this.mondayEnd).isBefore(moment(this.mondayStart))      

      if(mondayIsBefore){        
          this.uiUtils.showAlert("Atenção", "Verificar segunda").present()
          return false

      } else 
        this.datesWeek.push({id: 1, startTime: this.mondayStart, endTime: this.mondayEnd})      
    }      
    
    if(this.tuesday){
      let tuesdayIsBefore = moment(this.tuesdayEnd).isBefore(moment(this.tuesdayStart))

      if(tuesdayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar terça").present()
        return false

      } else 
        this.datesWeek.push({id: 2, startTime: this.tuesdayStart, endTime: this.tuesdayEnd})    
    }
      
    if(this.wednesday){
      let wednesdayIsBefore = moment(this.wednesdayEnd).isBefore(moment(this.wednesdayStart))

      if(wednesdayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar quarta").present()
        return false

      } else 
        this.datesWeek.push({id: 3, startTime: this.wednesdayStart, endTime: this.wednesdayEnd})  
    }      

    if(this.thursday){
      let thursdayIsBefore = moment(this.thursdayEnd).isBefore(moment(this.thursdayStart))

      if(thursdayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar quinta").present()
        return false

      } else 
        this.datesWeek.push({id: 4, startTime: this.thursdayStart, endTime: this.thursdayEnd})    
    }
      
    if(this.friday){

      let fridayIsBefore = moment(this.fridayEnd).isBefore(moment(this.fridayStart))

      if(fridayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar sexta").present()
        return false

      } else 
        this.datesWeek.push({id: 5, startTime: this.fridayStart, endTime: this.fridayEnd})    
    }
      
    if(this.saturday){

      let saturdayIsBefore = moment(this.saturdayEnd).isBefore(moment(this.saturdayStart))

      if(saturdayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar sábado").present()
        return false

      } else
        this.datesWeek.push({id: 6, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
    }
     
    if(this.sunday){

      let sundayIsBefore = moment(this.sundayEnd).isBefore(moment(this.sundayStart))

      if(sundayIsBefore){        
        this.uiUtils.showAlert("Atenção", "Verificar domingo").present()
        return false
      } else 
        this.datesWeek.push({id: 7, startTime: this.saturdayStart, endTime: this.saturdayEnd})    
      
    }

    return true
  }

  addProfileDayWeek(){
    /*if(this.populateDayweekData())
      this.addProfileDayWeekContinue(this.datesWeek)   */   
  }

  addProfileDayWeekContinue(data){
   /* let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
    loading.present()

    this.httpd.addAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, data)
      .subscribe( () => {

        loading.dismiss()
        this.navCtrl.pop()
        this.events.publish('refreshProfiles', this.selectedType); 
        this.uiUtils.showAlertSuccess()
      })*/
  }


  updateProfileDayWeek(){        

    /*if(this.populateDayweekData()){

      let loading = this.uiUtils.showLoading(this.dataInfo.titleLoadingInformations)
      loading.present()
  
      this.httpd.updateAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, this.datesWeek, this.profile.id)
        .subscribe( () => {
  
          loading.dismiss()        
          this.navCtrl.pop()
          this.events.publish('refreshProfiles', this.profile.id_type);
          this.uiUtils.showAlertSuccess()
        })
    }    */
  }

}
