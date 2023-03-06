import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Car } from "../model/car.model";
import { PercentByAge } from "../model/percentbyage.model";




@Injectable()
export class PercentByAgeService{
    private BaseUrl :string = 'http://localhost:57771/api/percentbyage/';
    constructor(
        private httpClient : HttpClient,
    ){};

    findall(){
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallpercentbyage',{ headers: headers}).toPromise().then(res=>res as PercentByAge[]);
    }
    
    find(idcar:string){
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findpercentbyage'+'/'+idcar,{ headers: headers}).toPromise().then(res=>res as PercentByAge);
      }

      update(percentbyageInfo:PercentByAge){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.put(this.BaseUrl+'updatepercentbyage',percentbyageInfo,{ headers: headers}).toPromise().then(res=>res as PercentByAge);
      }

     

}