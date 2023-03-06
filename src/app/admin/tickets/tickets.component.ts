import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
})
export class TicketsComponent implements OnInit {
  fullnameUser: string;
  tickets: Ticket[];
  constructor(
    private ticketAPI: TicketService
  ) { }

  ngOnInit(): void {
    this.fullnameUser = sessionStorage.getItem("fullname");
    this.ticketAPI.findall().then(res => {
      this.tickets = res;
    }, err => {

    })
  }

  refund(e: any) {
    var id = e.target.value;
    this.ticketAPI.Refund(id).then(res => {
      if(res){
        alert("Success");
        window.location.reload();
      }else{
        alert("Error")
      }
    }, err => {

    });
  }

}
