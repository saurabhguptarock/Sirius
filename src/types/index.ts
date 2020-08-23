export interface User {
  name: string;
  uid: string;
  email: string;
}
export interface Board {
  boardId: string;
  name: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface Tile {}
