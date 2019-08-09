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

  blockUser(user_){
    let myData = JSON.stringify({id: this.dataInfo.userId, user: user_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/blockUser", myData, {headers: headers})
  }

  activeUser(user_){
    let myData = JSON.stringify({id: this.dataInfo.userId, user: user_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/activeUser", myData, {headers: headers})
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

  getGuestTypes(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getGuestTypes", myData, {headers: headers})
  }

  getSectors(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getSectors", myData, {headers: headers})
  }


  getSectorsName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getSectorsByName", myData, {headers: headers})
  }

  getCompanies(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getCompanies", myData, {headers: headers})
  }

  getCompaniesByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getCompaniesByName", myData, {headers: headers})
  }

  getOffices(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getOffices", myData, {headers: headers})
  }

  getOfficeByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getOfficeByName", myData, {headers: headers})
  }

  getEmployees(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getEmployees", myData, {headers: headers})
  }

  addEmployee(name_, commumName_, rg_, cpf_, district_, tel_, ramal_, registration_, badge_, 
    employeeFunction_, employeeType_, employeeSector_, employeeCompany_, employeeOffice_, endereco_){

    let myData = JSON.stringify({id: this.dataInfo.userId, 
      name: name_, 
      endereco: endereco_,
      commumName: commumName_, 
      rg: rg_,
      cpf: cpf_,
      district: district_,
      tel: tel_,
      ramal: ramal_,
      registration: registration_,
      badge: badge_,
      employeeFunction: employeeFunction_,
      employeeType: employeeType_,
      employeeSector: employeeSector_,
      employeeCompany
      : employeeCompany_,
      employeeOffice: employeeOffice_    
    });

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addEmployee", myData, {headers: headers})
  }

  editEmployee(id_, name_, commumName_, rg_, cpf_, district_, tel_, ramal_, registration_, badge_, 
    employeeFunction_, employeeType_, employeeSector_, employeeCompany_, employeeOffice_, endereco_){
    
    let myData = JSON.stringify({
      id: id_, 
      name: name_, 
      endereco: endereco_,
      commumName: commumName_, 
      rg: rg_,
      cpf: cpf_,
      district: district_,
      tel: tel_,
      ramal: ramal_,
      registration: registration_,
      badge: badge_,
      employeeFunction: employeeFunction_,
      employeeType: employeeType_,
      employeeSector: employeeSector_,
      employeeCompany: employeeCompany_,
      employeeOffice: employeeOffice_    
    });

    console.log(myData)

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/editEmployee", myData, {headers: headers})
  }

  getEmployeesByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getEmployeesByName", myData, {headers: headers})
  }

  addGuest(name_, authorizedBy_, rg_, cpf_, district_, tel_, ramal_, registration_, badge_, 
    employeeFunction_, employeeType_, employeeSector_, employeeCompany_, employeeOffice_, endereco_){

    let myData = JSON.stringify({id: this.dataInfo.userId, 
      name: name_, 
      endereco: endereco_,
      authorizedBy: authorizedBy_, 
      rg: rg_,
      cpf: cpf_,
      district: district_,
      tel: tel_,
      ramal: ramal_,
      registration: registration_,
      badge: badge_,
      employeeFunction: employeeFunction_,
      employeeType: employeeType_,
      employeeSector: employeeSector_,
      employeeCompany: employeeCompany_,
      employeeOffice: employeeOffice_    
    });

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addGuest", myData, {headers: headers})
  }

  editGuest(id_, name_, authorizedBy_, rg_, cpf_, district_, tel_, ramal_, registration_, badge_, 
    employeeFunction_, employeeType_, employeeSector_, employeeCompany_, employeeOffice_, endereco_){
    
    let myData = JSON.stringify({
      id: id_, 
      name: name_, 
      endereco: endereco_,
      authorizedBy: authorizedBy_, 
      rg: rg_,
      cpf: cpf_,
      district: district_,
      tel: tel_,
      ramal: ramal_,
      registration: registration_,
      badge: badge_,
      employeeFunction: employeeFunction_,
      employeeType: employeeType_,
      employeeSector: employeeSector_,
      employeeCompany: employeeCompany_,
      employeeOffice: employeeOffice_    
    });

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/editGuest", myData, {headers: headers})
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

  getAccessGroupsByName(name_, id_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, idAccessGroupType: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroupsByName", myData, {headers: headers})
  }

  getAccessGroupsBySector(name_, id_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, idAccessGroupType: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroupsBySector", myData, {headers: headers})
  }

  getAccessGroupsTypeById(id_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idAccessGroupType: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroupsTypeById", myData, {headers: headers})
  }

  getAccessGroupsTypes(id_){
    let myData = JSON.stringify({id: this.dataInfo.userId,  idAccessGroupType: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessGroupsTypes", myData, {headers: headers})
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

  updateAccessProfileExpire(name_, desc_, type_, start_, end_, idProfile_){

    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, 
      desc: desc_, start: start_, end: end_, type: type_, idProfile: idProfile_});

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
  
  getAccessProfilesNameEmployee(idEmployee_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idEmployee: idEmployee_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessProfilesNameEmployee", myData, {headers: headers})
  } 

  getAclsNameEmployee(idEmployee_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idEmployee: idEmployee_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAclsNameEmployee", myData, {headers: headers})
  } 

  getAccessProfileGuests(idGuest_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idGuest: idGuest_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessProfileGuests", myData, {headers: headers})
  }

  getAccessProfilesNameGuest(idGuest_){
    let myData = JSON.stringify({id: this.dataInfo.userId, idGuest: idGuest_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessProfilesNameGuest", myData, {headers: headers})
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
    
  verificaCracha(cracha_){
    let myData = JSON.stringify({id: this.dataInfo.userId, cracha: cracha_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/verificaCracha", myData, {headers: headers})
  }

  getVehicleTypes(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getVehicleTypes", myData, {headers: headers})
  }

  getVehicleModels(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getVehicleModels", myData, {headers: headers})
  }

  getVehicleBrands(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getVehicleBrands", myData, {headers: headers})
  }

  getVehicleByEmployeeId(id_: number){    
    let myData = JSON.stringify({id: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getVehicleByEmployeeId", myData, {headers: headers})
  }

  addVehicle(vehicles_){
    let myData = JSON.stringify({id: this.dataInfo.userId, vehicles: vehicles_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    console.log(myData)
    return this.http.post(this.address  + "/addVehicle", myData, {headers: headers})
  }

  addAccessPointsEmployee(accessPoints_, badge_){
    let myData = JSON.stringify({id: this.dataInfo.userId, accessPoints: accessPoints_, badge: badge_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    console.log(myData)
    return this.http.post(this.address  + "/addAccessPointsEmployee", myData, {headers: headers})
  }

  getAccessPoints(){    
    let myData = JSON.stringify({id: 1});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessPoints", myData, {headers: headers})
  }
  
  getAccessPointsByName(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessPointsByName", myData, {headers: headers})
  }

  delAccessPoints(ap_){
    let myData = JSON.stringify({id: this.dataInfo.userId, ap: ap_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delAccessPoints", myData, {headers: headers})
  }

  getAccessPointsEmployee(id_: number){    
    let myData = JSON.stringify({id: id_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getAccessPointsEmployee", myData, {headers: headers})
  }

  addCompany(name_, responsavel_, endereco_, bairro_, cnpj_, tel_, status_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, responsavel: responsavel_, endereco: endereco_, 
      bairro: bairro_, cnpj: cnpj_, tel: tel_, status: status_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addCompany", myData, {headers: headers})
  }

  saveCompany(id_, name_, responsavel_, endereco_, bairro_, cnpj_, tel_, status_){
    let myData = JSON.stringify({id: id_, name: name_, responsavel: responsavel_, endereco: endereco_, 
      bairro: bairro_, cnpj: cnpj_, tel: tel_, status: status_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveCompany", myData, {headers: headers})
  }

  delCompany(acl_){
    let myData = JSON.stringify({id: this.dataInfo.userId, acl: acl_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delCompany", myData, {headers: headers})
  }

  addOffice(name_, obs_, status_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, obs: obs_, status: status_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addOffice", myData, {headers: headers})
  }

  saveOffice(id_, name_, obs_, status_){
    let myData = JSON.stringify({id: id_, name: name_, obs: obs_, status: status_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveOffice", myData, {headers: headers})
  }

  delOffice(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delOffice", myData, {headers: headers})
  }

  addSector(name_, obs_, status_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, obs: obs_, status: status_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addSector", myData, {headers: headers})
  }

  saveSector(id_, name_, obs_, status_){
    let myData = JSON.stringify({id: id_, name: name_, obs: obs_, status: status_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveSector", myData, {headers: headers})
  }

  delSector(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delSector", myData, {headers: headers})
  }

  addAccessPoint(name_, status_, apType_, apCu_, ipAddress_, ipCameras_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_, status: status_, apType: apType_,
      apCu: apCu_, ipAddress: ipAddress_, ipCameras: ipCameras_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/addAccessPoint", myData, {headers: headers})
  }

  saveAccessPoint(id_, name_, status_, apType_, apCu_, ipAddress_, ipCameras_){
    
    let myData = JSON.stringify({id: id_, name: name_, status: status_, apType: apType_,
      apCu: apCu_, ipAddress: ipAddress_, ipCameras: ipCameras_});

    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/saveAccessPoint", myData, {headers: headers})
  }

  delAccessPoint(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/delAccessPoint", myData, {headers: headers})
  }

  getBadges(){
    let myData = JSON.stringify({id: this.dataInfo.userId});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getBadges", myData, {headers: headers})
  }

  getBadgesNumber(name_){
    let myData = JSON.stringify({id: this.dataInfo.userId, name: name_});
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.address  + "/getBadgesNumber", myData, {headers: headers})
  }


}