import { model, Schema } from "mongoose";
import { IBagItem } from "./Bag.model";
import { IUser } from "./User.model";

export interface ITripPeriod {
  startDate: Date;
  endDate: Date;
  formatted: string;
}

export interface ITrip {
  // trip _id field is predefined by mongoose
  tripName: string;
  locations: Object[];
  teammates: IUser[];
  tripPeriod: ITripPeriod;
  bagItems: IBagItem[];
  userId: string;
  completed: boolean;
  activated: boolean;
}

const tripSchema = new Schema<ITrip>({
  userId: { type: String, required: true },
  tripName: { type: String, required: true },
  // locations is handled on frontend and different according to chosen API
  locations: { type: Array<Object>(), default: [], required: true },
  teammates: { type: Array<IUser>(), default: [], required: true },
  tripPeriod: {
    type: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      formatted: { type: String, required: true },
    },
    required: true,
  },
  bagItems: { type: Array<IBagItem>(), default: [], required: true },
  // trip is completed when user add all items to bag or skip this step
  completed: { type: Boolean, default: false },
  // trip is activated when user post trip data request
  activated: { type: Boolean, default: false },
});

export const Trip = model("trips", tripSchema);