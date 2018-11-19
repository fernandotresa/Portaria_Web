import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }

  currentUserUid(){
    return 1;
  }

  currentUserEmail(){
    return "diego.freebsd@gmail.com"
  }
}
