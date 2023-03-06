import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Car } from "../model/car.model";




@Injectable()
export class CarService{
    private BaseUrl :string = 'http://localhost:57771/api/cars/';
    constructor(
        private httpClient : HttpClient,
    ){};

    findall(){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        
        return this.httpClient.get(this.BaseUrl+'findallcarsbysa',{ headers: headers}).toPromise().then(res=>res as Car[]);
    }
    
    findTypeByIDtype(id:number){
      var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findtypecarbyid'+'/'+id,{ headers: headers}).toPromise().then(res=>res as Object);
    }
    find(idcar:string){
      var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.get(this.BaseUrl+'findcarbyid'+'/'+idcar,{ headers: headers}).toPromise().then(res=>res as Car);
      }

    create(carInfo:Car){ 
      var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
          return this.httpClient.post(this.BaseUrl+'createcar',carInfo,{ headers: headers}).toPromise().then(res=>res as Car);
      }
   
      uploadfile(file :FormData){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.BaseUrl+'uploadfile', file,{ headers: headers}).toPromise().then(res=>res as string);
      }

      update(acc:Car){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.put(this.BaseUrl+'updatecar',acc,{ headers: headers}).toPromise().then(res=>res as Car);
      }

      delete(idcar:string){
        var token ="Bearer "+sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.delete(this.BaseUrl+'deletecar'+'/'+idcar,{ headers: headers}).toPromise().then(res=>res as boolean);
      }


}