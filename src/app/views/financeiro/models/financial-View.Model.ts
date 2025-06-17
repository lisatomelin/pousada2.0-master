export type FinancialViewModel = {
  id: string;
  checkIn: Date;
  checkOut: Date;
  guestId: string;
  guestName?: string;
  roomId: string;
  roomName?: string;
  reservationValue: number;
  additionalValue: number;
  payment: string;
  status?: string;
}
