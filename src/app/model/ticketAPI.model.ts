import { Account } from "./account.model"
import { ActiveTrips } from "./activetrips.model"

export class TicketAPI {
    id: string;
    fromAddress: string
    toAddress: string;
    idAccCustomer: string;
    total: number;
    createDate: string;
    creater: string;
    startDate: string;
    age: number
    idactiveTrip: number
    seats: string;
}