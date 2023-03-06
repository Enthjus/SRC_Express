import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PricePerKm } from "../model/priceperkm.model";
import { Trip } from "../model/trip.model";






@Injectable()
export class PricePerKmService{
    private BaseUrl :string = 'http://localhost:57771/api/priceperkm/';
    constructor(
        private httpClient : HttpClient,
    ){};

    
    find(idPrice:string){
      var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findpriceperkmbyid'+'/'+idPrice,{ headers: headers}).toPromise().then(res=>res as PricePerKm);
      }

      update(priceperkmInfo:PricePerKm){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.put(this.BaseUrl+'updatepriceperkm',priceperkmInfo,{ headers: headers}).toPromise().then(res=>res as PricePerKm);
      }


}