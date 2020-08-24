export interface User {
  name: string;
  uid: string;
  email: string;
  backgroundUrl: string;
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
  items: Item[];
}

export interface Item {
  title: string;
  cardId: string;
  position: number;
}
