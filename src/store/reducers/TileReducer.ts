import { ADD_CARD, ADD_TILE } from "../actions/TileAction";

const initialState = [];

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TILE:
      const newList = {
        title: action.title,
        id: action.id,
        cards: [],
      };
      return [...state, newList];
    case ADD_CARD:
      const newCard = {
        text: action.payload.text,
        id: action.payload.id,
      };
      const newState = state.map((tile) => {
        if (tile.id === action.payload.tileId) {
          return {
            ...tile,
            cards: [...tile.cards, newCard],
          };
        } else {
          return tile;
        }
      });
      return newState;
    default:
      return state;
  }
};
export default ListReducer;
