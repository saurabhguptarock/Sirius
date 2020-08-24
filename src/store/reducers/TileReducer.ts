import { ADD_CARD, ADD_TILE, DRAG_END, ADD_BOARD } from "../actions/TileAction";
import { Tile } from "../../types";

const initialState = [];

const TileReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case ADD_BOARD: {
      const tiles: Tile[] = action.tiles;
      return [...tiles];
    }

    case ADD_TILE: {
      const newList = {
        title: action.payload.title,
        id: action.payload.id,
        position: action.payload.position,
        items: [],
      };
      return [...state, newList];
    }

    case ADD_CARD: {
      const newCard = {
        title: action.payload.title,
        position: action.payload.cardPosition,
        cardId: `card-${action.payload.tilePosition}-${action.payload.cardPosition}`,
      };
      const newState = state.map((tile) => {
        if (tile.id === action.payload.tileId) {
          return {
            ...tile,
            items: [...tile.items, newCard],
          };
        } else {
          return tile;
        }
      });
      return newState;
    }

    // case DRAG_END: {
    //   const {
    //     droppableIdStart,
    //     droppableIdEnd,
    //     droppableIndexStart,
    //     droppableIndexEnd,
    //     draggableId,
    //     type,
    //   } = action.payload;
    //   const newState = [...state];

    // Dragging tiles
    // if (type === "tile") {
    //   const tiles = newState.splice(droppableIndexStart, 1);
    //   newState.splice(droppableIndexEnd, 0, ...tiles);
    //   return newState;
    // }

    // // In same Tile
    // if (droppableIdEnd === droppableIdEnd) {
    //   const tiles = state.find((tile) => droppableIdStart === tile.id);
    //   const items = tiles.items.splice(droppableIndexStart, 1);
    //   tiles.items.splice(droppableIndexEnd, 0, ...items);
    // }

    // // In other Tile
    // if (droppableIdEnd !== droppableIdStart) {
    //   const tileStart = state.find((tile) => droppableIdStart === tile.id);
    //   const items = tileStart.items.splice(droppableIndexStart, 1);
    //   const tileEnd = state.find((tile) => droppableIdEnd === tile.id);
    //   tileEnd.items.splice(droppableIndexEnd, 0, ...items);
    // }

    //   return newState;
    // }

    default:
      return state;
  }
};
export default TileReducer;
