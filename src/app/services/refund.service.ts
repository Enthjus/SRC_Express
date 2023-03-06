import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Refund } from "../model/refund.model";
import { RequestRefund } from "../model/requestrefund.model";
import { Trip } from "../model/trip.model";






@Injectable()
export class RefundService{
    private BaseUrl :string = 'http://localhost:57771/api/refund/';
    constructor(
        private httpClient : HttpClient,
    ){};

    findall(){
      var token ="Bearer "+sessionStorage.getItem("jwt");
      let headers = new HttpHeaders().set('Authorization', token);
          
          return this.httpClient.get(this.BaseUrl+'findallrefund',{ headers: headers}).toPromise().then(res=>res as Refund[]);
      }
      
      find(idprice:string){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
          return this.httpClient.get(this.BaseUrl+'findrefund'+'/'+idprice,{ headers: headers}).toPromise().then(res=>res as Refund);
        }
  
        update(refundInfo:Refund){
          var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
          return this.httpClient.put(this.BaseUrl+'updaterefund',refundInfo,{ headers: headers}).toPromise().then(res=>res as Refund);
        }

        findallRequestRefund(){
          var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
              
              return this.httpClient.get(this.BaseUrl+'findallrequestrefund',{ headers: headers}).toPromise().then(res=>res as RequestRefund[]);
          }

          UpdateStatusRequestRefund(idRequestRefund:number){
            var token ="Bearer "+sessionStorage.getItem("jwt");
          let headers = new HttpHeaders().set('Authorization', token);
            return this.httpClient.put(this.BaseUrl+'updatestatusrequestrefund/'+idRequestRefund,{ headers: headers}).toPromise().then(res=>res as boolean);
          }

}