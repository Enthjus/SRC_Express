import { Car } from "./car.model";
import { TimeStart } from "./timestart.model";
import { Trip } from "./trip.model";

export class ActiveTrips{
     id : number;
     trip : Trip;
     timeStart : TimeStart
     car :Car
     status :number
}
