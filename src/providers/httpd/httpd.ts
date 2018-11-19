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
}