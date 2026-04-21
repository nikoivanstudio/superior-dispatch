export type AuthUser = {
  id: number;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string | null;
};
