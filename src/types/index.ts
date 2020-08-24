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

export interface Tile {
  id: string;
  position: number;
  title: string;
  items: Items[];
}

export interface Items {
  title: string;
  cardId: string;
  position: number;
}
