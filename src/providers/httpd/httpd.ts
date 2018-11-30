import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpdProvider {

  data:any = {};
  
  address : string = 'http://localhost:8085'    

  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(public http: HttpClient, 
    public authProvider: AuthProvider,
    public dataInfo: DataInfoProvider) {
    console.log('Hello HttpdProvider Provider', this.address);
  }  

  GET(url) {
    return this.http.get(url);
  }

  getAuth(username_, password_){
    let myData = JSON.stringify({id: this.dataInfo.userId, username: username_, password: password_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAuth", myData, {headers: headers})
  }

  getWorkFunctions(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getWorkFunctions", myData, {headers: headers})
  }

  getEmployeeTypes(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getEmployeeTypes", myData, {headers: headers})
  }

  getSectors(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getSectors", myData, {headers: headers})
  }

  getCompanies(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getCompanies", myData, {headers: headers})
  }

  getOffices(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getOffices", myData, {headers: headers})
  }

  getEmployees(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getEmployees", myData, {headers: headers})
  }

  getEmployeesByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getEmployeesByName", myData, {headers: headers})
  }

  getGuests(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getGuests", myData, {headers: headers})
  }

  getGuestsByName(name_){    
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getGuestsByName", myData, {headers: headers})
  }
 
  getAccessGroups(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroups", myData, {headers: headers})
  }

  delAccessGroups(group){
    let myData = JSON.stringify({id: this.dataInfo.userId, profile: group});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delAccessGroups", myData, {headers: headers})
  }  

  getAccessControlTypes(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessControlTypes", myData, {headers: headers})
  }

  addAccessProfileExpire(name_, desc_, type_, start_, end_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, start: start_, end: end_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileExpire", myData, {headers: headers})
  }

  addAccessProfileDatetime(name_, desc_, type_, events_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, events: events_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileDatetime", myData, {headers: headers})
  }

  addAccessProfileDayweek(name_, desc_, type_, events_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, events: events_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileDayweek", myData, {headers: headers})
  }
}