export type StringifiedDispatchToken = {
  access_token: string;
  token_type: string;
  expires_in: string;
  scope: string;
};

export type DispatchToken = Omit<StringifiedDispatchToken, 'expires_in'> & {
  expires_in: number;
};
