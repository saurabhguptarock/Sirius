export const ADD_TILE = "ADD_TILE";
export const ADD_CARD = "ADD_CARD";

export const addTile = (title: string) => {
  return {
    type: ADD_TILE,
    title,
  };
};

export const addCard = (tileId: string, content: string) => {
  return {
    type: ADD_CARD,
    payload: {
      tileId,
      content,
    },
  };
};
