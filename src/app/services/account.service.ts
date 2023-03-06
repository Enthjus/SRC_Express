import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Account } from "../model/account.model";




@Injectable()
export class AccountService{
    private BaseUrl :string = 'http://localhost:57771/api/account/';
    constructor(
        private httpClient : HttpClient,
    ){};

    dashboard(){
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
      return this.httpClient.get(this.BaseUrl+'dashboard',{ headers: headers}).toPromise().then(res=>res as boolean);
    }

    findall(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallaccountbysa',{ headers: headers}).toPromise().then(res=>res as Account[]);
    }

    create(acc:Account){
          
          
          return this.httpClient.post(this.BaseUrl+'register',acc).toPromise().then(res=>res as boolean);
      }

      find(idacc:string){
        var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findidaccountbysa'+'/'+idacc,{ headers: headers}).toPromise().then(res=>res as Account);
      }

      uploadfile(file :FormData){
        var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.BaseUrl+'uploadfile', file,{ headers: headers}).toPromise().then(res=>res as string);
      }

      update(acc:Account){
        var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.put(this.BaseUrl+'update',acc,{ headers: headers}).toPromise().then(res=>res as Account);
      }

      delete(idacc:string){
        var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.delete(this.BaseUrl+'delete'+'/'+idacc,{ headers: headers}).toPromise().then(res=>res as boolean);
      }

      login(user:Account){
        return this.httpClient.post(this.BaseUrl+'login',user).toPromise().then(res=>res as string);
    }

}