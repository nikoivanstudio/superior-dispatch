type Role =
  | 'OWNER'
  | 'DISPATCHER'
  | 'DRIVER'
  | 'BILLING'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type UserEntity = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  carsPerMonth: string;
  usdot: string;
  hear?: string;
};
