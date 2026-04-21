type DriverStatus = 'activated' | 'deactivated';

export type DispatchDriver = {
  id: number;
  name: string;
  phone: string;
  email: string;
  truck_capacity: number;
  status: DriverStatus;
};
