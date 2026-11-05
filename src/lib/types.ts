export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type Booking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  hostEmail: string;
  userEmail: string;
  userName: string;
  date: string;
  startHour: number;
  endHour: number;
  hours: number;
  totalPrice: number;
  note: string;
  status: BookingStatus;
  createdAt: string;
};