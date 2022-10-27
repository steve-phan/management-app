export interface ICustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IAppointment extends ICustomer {
  created_at?: string;
  person: string;
  require?: string;
  selectedDate: string;
  selectedSlot: string;
  slots?: string;
  status: boolean;
  __v?: number;
  _id?: string;
  canceled?: boolean;
}
