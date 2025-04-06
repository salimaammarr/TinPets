export interface AuthResponse {
  token: string;
  userId: string;
}

export interface User {
  _id: string;
  username: string;
  createdAt: string;
}

export interface Pet {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  owner: string;
  createdAt: string;
}
