import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CalendarUtilsProvider {

  constructor() {
    console.log('Hello CalendarUtilsProvider Provider');
  }

  parseDateBr(datetime){
    return moment(datetime).add(3, 'hours').format()
  }

}
