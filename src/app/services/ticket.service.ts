import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Seats } from "../model/seats.model";
import { Ticket } from "../model/ticket.model";
import { TicketAPI } from "../model/ticketAPI.model";
import { Trip } from "../model/trip.model";






@Injectable()
export class TicketService {
    private BaseUrl: string = 'http://localhost:57771/api/tickets/';
    constructor(
        private httpClient: HttpClient,
    ) { };

    findall() {
        var token = "Bearer " + sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);

        return this.httpClient.get(this.BaseUrl + 'findallticket', { headers: headers }).toPromise().then(res => res as Ticket[]);
    }

    getTotalTam(idactiveTrip: number, age: number) {
        var token = "Bearer " + sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);

        return this.httpClient.get(this.BaseUrl + 'gettotaltam/'+idactiveTrip+'/'+age, { headers: headers }).toPromise().then(res => res as number);
    }

    getListSeats(idactivetrip:number,dayStart:number,monthStart:number,yearStart:number){
        var token = "Bearer " + sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);

        return this.httpClient.get(this.BaseUrl + 'findlistseats/'+idactivetrip+'/'+dayStart+'/'+monthStart+'/'+yearStart, { headers: headers }).toPromise().then(res => res as Seats[]);
    }

    create(tk: TicketAPI) {
        var token = "Bearer " + sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.BaseUrl + 'createticket', tk, { headers: headers }).toPromise().then(res => res as Ticket);
    }

    Refund(idticket:number) {
        var token = "Bearer " + sessionStorage.getItem("jwt");
        let headers = new HttpHeaders().set('Authorization', token);

        return this.httpClient.get(this.BaseUrl + 'refundticket/'+idticket, { headers: headers }).toPromise().then(res => res as boolean);
    }

}