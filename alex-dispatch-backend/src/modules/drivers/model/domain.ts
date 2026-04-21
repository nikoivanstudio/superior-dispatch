export type DriverDto = {
  id: number;
  name: string;
  phone: string;
  email: string;
  passwordHash: string;
  truckCapacity?: number | null;
  status: string;
};

export type DriverEntity = Omit<DriverDto, 'passwordHash'>;
