import { Account } from "./account.model"
import { ActiveTrips } from "./activetrips.model"

export class Ticket {
    id: number
    idAccCustomer: Account
    total: number
    createDate: string
    creater: string
    startDate: string
    age: number
    idactiveTrip: ActiveTrips
    seats: string
}