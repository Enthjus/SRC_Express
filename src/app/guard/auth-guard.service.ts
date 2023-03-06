import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable()
export class AuthGuard implements CanActivate{
   
    constructor(
        private route :Router,
        private jwtHelper:JwtHelperService
    ){};

   canActivate(){
       var token = sessionStorage.getItem("jwt");
       if(token && !this.jwtHelper.isTokenExpired(token)){
           var t = this.jwtHelper.decodeToken(token);
           var c = JSON.parse(JSON.stringify(t))
          var r=c['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          if(r=="SA"||r=="Admin"){
            return true
          }else{
            this.route.navigate(["home"]);
              return false;
          }
          
       }
       this.route.navigate(["login"]);
       return false;
   }

}