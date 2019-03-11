
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class MomentsProvider {

  constructor() {

    console.log('Hello MomentsProvider Provider');
  }

  getStartDay(){
    let datestmp = new Date()
    datestmp.setHours(0,0,0)
    return datestmp;
  }

  getStartDayStr(){        
    return "00:00"
  }

  getEndDay(){
    let datestmp = new Date()
    datestmp.setHours(23,59,59)
    return datestmp;
  }

  getEndDayStr(){
    return "23:59"
  }

}
