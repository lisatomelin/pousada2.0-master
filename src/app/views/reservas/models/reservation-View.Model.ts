import { HospedesModule } from "../../hospedes/hospedes.module";
import { RoomsViewModel } from "../../quartos/models/rooms-View.Model";

export type ReservationViewModel = {
  id: string;
  CheckIn: Date;
  CheckOut: Date;
  NumberOfAdults: number;
  NumberOfChildren: number;
  quarto: RoomsViewModel;
  hospede: HospedesModule;
  roomId: string;
  guestId: string;

}
