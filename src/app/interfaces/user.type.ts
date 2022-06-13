export interface User {
  id: number;
  active: boolean;
  // names fields
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  createDate: Date;
}

export interface Login {
  username: string;
  password: string;
}
