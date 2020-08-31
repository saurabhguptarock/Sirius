export interface User {
  name: string;
  uid: string;
  email: string;
  recentBoard?: Board;
}

export interface Notification {
  createdAt: Date;
  id: string;
  title: string;
  markedAsRead: boolean;
}
export interface Board {
  boardId: string;
  name: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  backgroundUrl: string;
}

export interface Template {
  name: string;
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
}
export interface Wallpaper {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  description?: null;
  alt_description: string;
  urls: Urls;
  categories?: null[] | null;
  likes: number;
  liked_by_user: boolean;
  current_user_collections?: null[] | null;
  sponsorship?: null;
}
export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
