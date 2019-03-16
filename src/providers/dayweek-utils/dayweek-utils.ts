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

      this.setDateDefaultDayweeks()
      this.subscribeStuff()
  }

  subscribeStuff(){    
    
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

    this.events.subscribe('setHourStart', hourStart => {
      this.hourStart = hourStart
    })

    this.events.subscribe('setHourEnd', hourEnd => {
      this.hourEnd = hourEnd
    }) 

    this.events.subscribe('monday', monday => {
      this.monday = monday
    })    

    this.events.subscribe('mondayStart', mondayStart => {
      this.mondayStart = mondayStart
    })    

    this.events.subscribe('mondayEnd', mondayEnd => {
      this.mondayEnd = mondayEnd
    })    

    this.events.subscribe('tuesday', tuesday => {
      this.tuesday = tuesday
    })  

    this.events.subscribe('tuesdayEnd', tuesdayEnd => {
      this.tuesdayEnd = tuesdayEnd
    })  

    this.events.subscribe('tuesdayStart', tuesdayStart => {
      this.tuesdayStart = tuesdayStart
    })  

    this.events.subscribe('wednesday', wednesday => {
      this.hourEnd = wednesday
    })  

    this.events.subscribe('wednesdayStart', wednesdayStart => {
      this.wednesdayStart = wednesdayStart
    })  

    this.events.subscribe('wednesdayEnd', wednesdayEnd => {
      this.wednesdayEnd = wednesdayEnd
    })       

    this.events.subscribe('thursday', thursday => {
      this.thursday = thursday
    })  

    this.events.subscribe('thursdayStart', thursdayStart => {
      this.thursdayStart = thursdayStart
    })  

    this.events.subscribe('thursdayEnd', thursdayEnd => {
      this.thursdayEnd = thursdayEnd
    })  

    this.events.subscribe('friday', friday => {
      this.friday = friday
    })  

    this.events.subscribe('fridayStart', fridayStart => {
      this.fridayStart = fridayStart
    })

    this.events.subscribe('fridayEnd', fridayEnd => {
      this.fridayEnd = fridayEnd
    })

    this.events.subscribe('saturday', saturday => {
      this.saturday = saturday
    })

    this.events.subscribe('saturdayStart', saturdayStart => {
      this.saturdayStart = saturdayStart
    })

    this.events.subscribe('saturdayEnd', saturdayEnd => {
      this.saturdayEnd = saturdayEnd
    })

    this.events.subscribe('sunday', sunday => {
      this.sunday = sunday
    })

    this.events.subscribe('sundayStart', sundayStart => {
      this.sundayStart = sundayStart
    })

    this.events.subscribe('sundayEnd', sundayEnd => {
      this.sundayEnd = sundayEnd
    })
  }

  ngOnDestroy() {    
    this.events.unsubscribe('setSelectedDay');		
    this.events.unsubscribe('setName');		
    this.events.unsubscribe('setDesc');	
    this.events.unsubscribe('setSelectedAccessType');	
    this.events.unsubscribe('setHourStart');	
    this.events.unsubscribe('setHourEnd');	
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

    this.events.publish('calendarDisabled', true)
    this.events.publish('updatingDates', true)      

    data.success.forEach(element => {
      this.populateDaysweek(element)      
    });    

    setTimeout( () => {
      this.calendarDisabled = false
    }, 1000);
  }  

  populateDaysweek(element){

    console.log(element)

    let datetime_start = moment(element.datetime_start).format()
    let datetime_end = moment(element.datetime_end).format()
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

    this.updateItensDayweek()
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
    

    console.log(this.datesWeek)

    return true
  }

  addProfileDayWeek(){
    this.addProfileDayWeekContinue(this.datesWeek)         
  }

  addProfileDayWeekContinue(data){
    console.log(data)

    if(this.populateDayweekData()){

      let loading = this.uiUtils.showLoading("Favor aguarde")          
      loading.present()       

      this.httpd.addAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, this.datesWeek)
        .subscribe( () => {

          loading.dismiss()
          this.events.publish('navCtrlPop', this.selectedType); 
          this.events.publish('refreshProfiles', this.selectedType); 
          this.uiUtils.showAlertSuccess()
        })

    }    
  }

  updateItensDayweek(){

    if(this.sunday){
      this.events.publish('setMondayStart', this.mondayStart)
      this.events.publish('setMondayEnd', this.mondayEnd)
    }    
    
    if(this.tuesday){
      this.events.publish('setTuesdayStart', this.tuesdayStart)
      this.events.publish('setTuesdayEnd', this.tuesdayEnd)
    }
    
    if(this.wednesday){
      this.events.publish('setWednesdayStart', this.wednesdayStart)
      this.events.publish('setWednesdayEnd', this.wednesdayEnd)
    }
    
    if(this.thursday){
      this.events.publish('setThursdayStart', this.thursdayStart)
      this.events.publish('setThursdayEnd', this.thursdayEnd)
    }
    
    if(this.friday){
      this.events.publish('setFridayStart', this.fridayStart)
      this.events.publish('setFridayEnd', this.fridayEnd)
    }

    if(this.saturday){
      this.events.publish('setSaturdayStart', this.saturdayStart)
      this.events.publish('setSaturdayEnd', this.saturdayEnd)
    }

    if(this.sunday){
      this.events.publish('setSundayStart', this.sundayStart)
      this.events.publish('setSundayEnd', this.sundayEnd)
    }    
  }


  updateProfileDayWeek(){        

    if(this.populateDayweekData()){

      console.log(this.datesWeek)

      let loading = this.uiUtils.showLoading("Favor aguarde")          
      loading.present()
  
      this.httpd.updateAccessProfileDayweek(this.name, this.desc, this.selectedAccessType, this.datesWeek, this.profile.id)
        .subscribe( () => {
  
          loading.dismiss()        
          this.events.publish('navCtrlPop', this.selectedType); 
          this.events.publish('refreshProfiles', this.profile.id_type);
          this.uiUtils.showAlertSuccess()
        })
    } 
  }

}
