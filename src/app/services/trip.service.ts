import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Trip } from "../model/trip.model";






@Injectable()
export class TripService{
    private BaseUrl :string = 'http://localhost:57771/api/trips/';
    constructor(
        private httpClient : HttpClient,
    ){};

    findall(){
      var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findalltripsbysa',{ headers: headers}).toPromise().then(res=>res as Trip[]);
    }
    
    find(idtrip:string){
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findtripbyidtrip'+'/'+idtrip,{ headers: headers}).toPromise().then(res=>res as Trip);
      }

    create(tripInfo:Trip){ 
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
          return this.httpClient.post(this.BaseUrl+'createtrip',tripInfo,{ headers: headers}).toPromise().then(res=>res as Trip);
      }
   
      uploadfile(file :FormData){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.BaseUrl+'uploadfile', file,{ headers: headers}).toPromise().then(res=>res as string);
      }

      update(tripInfo:Trip){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.put(this.BaseUrl+'updatetrip',tripInfo,{ headers: headers}).toPromise().then(res=>res as Trip);
      }

      delete(idtrip:number){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.delete(this.BaseUrl+'deletetrip'+'/'+idtrip,{ headers: headers}).toPromise().then(res=>res as boolean);
      }


}