export type UUID = string;

export interface CreateAccountInput {
  name: string;
  email: string;
  password: string;
  account_key: string;
  date_of_birth: Date;
  cpf: string;
}

export interface LoginAccountInput {
  email: string;
  password: string;
}

export interface IAccount {
  _id: UUID;
  name: string;
  email: string;
  password: string;
  account_key: string;
  date_of_birth: Date;
  cpf: string;
  balance_in_cents: number;
}

export interface Context {
  user: string;
}
