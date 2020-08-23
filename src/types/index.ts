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

export const ITEM_TYPE = "ITEM";

export const statuses = [
  {
    status: "open",
    color: "#EB5A46",
  },
  {
    status: "in progress",
    color: "#00C2E0",
  },
  {
    status: "in review",
    color: "#C377E0",
  },
  {
    status: "done",
    color: "#3981DE",
  },
];
