import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataInfoProvider } from '../../providers/data-info/data-info'
import { AuthProvider } from '../../providers/auth/auth';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpdProvider {

  data:any = {};  
  address : string = 'http://localhost:8085'    

  
    
  //address : string = 'http://suporte.3a.com.br:8085'    

  contentHeader: Headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(public http: HttpClient, 
    public authProvider: AuthProvider,
    public dataInfo: DataInfoProvider) {
      
    console.log('Hello HttpdProvider Provider', this.address);
  }  

  GET(url) {
    return this.http.get(url);
  }

  getUsers(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getUsers", myData, {headers: headers})
  }

  getUserByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getUserByName", myData, {headers: headers})
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

  getAccessGroupsByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroupsByName", myData, {headers: headers})
  }

  delAccessGroups(group){
    let myData = JSON.stringify({id: this.dataInfo.userId, profile: group});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delAccessGroups", myData, {headers: headers})
  }  

  getProfileInfo(idProfile_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idProfile: idProfile_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getProfileInfo", myData, {headers: headers})
  }  

  getAccessControlTypes(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessControlTypes", myData, {headers: headers})
  }

  addAccessProfileExpire(name_, desc_, type_, start0_, end0_, start1_, end1_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, start0: start0_, end0: end0_, start1: start1_, end1: end1_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileExpire", myData, {headers: headers})
  }

  updateAccessProfileExpire(name_, desc_, type_, start0_, end0_, idProfile_, start1_, end1_){

    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, start0: start0_, end0: end0_, start1: start1_, end1: end1_, 
      type: type_, idProfile: idProfile_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/updateAccessProfileExpire", myData, {headers: headers})
  }

  addAccessProfileDatetime(name_, desc_, type_, events_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, events: events_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileDatetime", myData, {headers: headers})
  }

  updateAccessProfileDatetime(name_, desc_, type_, events_, idProfile_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, idProfile: idProfile_,
      desc: desc_, events: events_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/updateAccessProfileDatetime", myData, {headers: headers})
  }

  addAccessProfileDayweek(name_, desc_, type_, events_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, events: events_, type: type_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessProfileDayweek", myData, {headers: headers})
  }

  updateAccessProfileDayweek(name_, desc_, type_, events_, idProfile_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, events: events_, type: type_, idProfile: idProfile_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/updateAccessProfileDayweek", myData, {headers: headers})
  }

  saveAccessProfileEmployee(profiles_, employeeId_){
    let myData = JSON.stringify({id: this.dataInfo.userId, profiles: profiles_, employeeId: employeeId_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveAccessProfileEmployee", myData, {headers: headers})
  }

  saveAccessProfileGuest(profiles_, guestId_){
    let myData = JSON.stringify({id: this.dataInfo.userId, profiles: profiles_, guestId: guestId_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveAccessProfileGuest", myData, {headers: headers})
  }

  getAccessProfileEmployee(idEmployee_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idEmployee: idEmployee_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessProfileEmployee", myData, {headers: headers})
  }  

  getAccessProfileGuests(idGuest_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idGuest: idGuest_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessProfileGuests", myData, {headers: headers})
  }

  getAcls(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAcls", myData, {headers: headers})
  }

  addAcl(name_, permission_, sectors_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, permission: permission_, sectors: sectors_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAcl", myData, {headers: headers})
  }

  saveAcl(idAcl_, name_, permission_, sectors_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, permission: permission_, sectors: sectors_, idAcl: idAcl_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveAcl", myData, {headers: headers})
  }

  delAcl(acl_){
    let myData = JSON.stringify({id: this.dataInfo.userId, acl: acl_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delAcl", myData, {headers: headers})
  }
  
  getAclsSectorsById(idAcl_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idAcl: idAcl_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAclsSectorsById", myData, {headers: headers})
  }

  getACLByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getACLByName", myData, {headers: headers})
  }

  getAclsUser(idUser_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idUser: idUser_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAclsUser", myData, {headers: headers})
  }

  getAclsUserSector(idUser_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idUser: idUser_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAclsUserSector", myData, {headers: headers})
  }

  saveAclsUser(acls_, idUser_){
    let myData = JSON.stringify({id: this.dataInfo.userId, 
      acls: acls_, idUser: idUser_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveAclsUser", myData, {headers: headers})
  }    

}