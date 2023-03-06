import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActiveTripsAPI } from "../model/activetripAPI.model";
import { ActiveTrips } from "../model/activetrips.model";
import { TimeStartAPI } from "../model/timestartAPI.model";






@Injectable()
export class ActiveTripsService{
    private BaseUrl :string = 'http://localhost:57771/api/activetrips/';
    constructor(
        private httpClient : HttpClient,
    ){};

    findall(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallactivetrip',{ headers: headers}).toPromise().then(res=>res as ActiveTrips[]);
    }

    findActiveTrip(idactivetrip:number){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findactivetrip/'+idactivetrip,{ headers: headers}).toPromise().then(res=>res as ActiveTrips);
    }

    findAllInfo(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallInfoCreate',{ headers: headers}).toPromise().then(res=>res as string);
    }
    findTimeStartOf1Trip(Idtrip:number){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findalltimestartof1trip/'+Idtrip,{ headers: headers}).toPromise().then(res=>res as TimeStartAPI[]);
    }

    findAllActivetripHasActive(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallactivetriphasactive',{ headers: headers}).toPromise().then(res=>res as ActiveTrips[]);
    }
    findAllActivetripHasActiveWithTYPECAR(idTypecar:number){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallactivetriphasactive/'+idTypecar,{ headers: headers}).toPromise().then(res=>res as ActiveTrips[]);
    }

    create(activetrip:ActiveTripsAPI){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.BaseUrl+'create',activetrip,{ headers: headers}).toPromise().then(res=>res as boolean);
    }
    update(Idactivetrip:string){

        var token ="Bearer "+sessionStorage.getItem("jwt");
        let aa = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.put(this.BaseUrl+'updateactive/'+Idactivetrip,{ headers: aa}).toPromise().then(res=>res as boolean);
      } 

      findActiveTripForPage(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findactivetripforpage',{ headers: headers}).toPromise().then(res=>res as ActiveTrips[]);
    }

}