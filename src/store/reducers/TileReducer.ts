import { ADD_CARD, ADD_TILE, DRAG_END, ADD_BOARD } from "../actions/TileAction";
import { Tile, Item } from "../../types";

let tilePosition = 2;

const initialState: Tile[] = [
  {
    id: "sd3fa90po234sdf89sdf7sfu8afa2",
    title: "Last Episode",
    position: 0,
    items: [
      { cardId: "card-0-0", position: 0, title: "we created a static list" },
    ],
  },
  {
    id: "sd3fa90po23df89sfa4ds654sad654u8afa2",
    title: "This Episode",
    position: 1,
    items: [
      { cardId: "card-1-0", position: 0, title: "I am best coder" },
      { cardId: "card-1-1", position: 1, title: "What is your name and game" },
    ],
  },
];

const TileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD: {
      const tiles: Tile[] = action.tiles;
      return [...tiles];
    }

    case ADD_TILE: {
      const newList = {
        title: action.payload.title,
        id: action.payload.id,
        position: tilePosition,
        items: [],
      };
      tilePosition += 1;
      return [...state, newList];
    }

    case ADD_CARD: {
      const newCard: Item = {
        title: action.payload.title,
        position: action.payload.cardPosition,
        cardId: `card-${tilePosition}-${action.payload.cardPosition}`,
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

    case DRAG_END: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      const newState = [...state];

      // Dragging tiles
      // if (type === "tile") {
      //   const tiles = newState.splice(droppableIndexStart, 1);
      //   newState.splice(droppableIndexEnd, 0, ...tiles);
      //   return newState;
      // }

      // In same Tile
      if (droppableIdStart === droppableIdEnd) {
        const tiles = state.find((tile) => droppableIdStart === tile.id);
        const items = tiles.items.splice(droppableIndexStart, 1);
        tiles.items.splice(droppableIndexEnd, 0, ...items);
      }

      // In other Tile
      else {
        const tileStart = state.find((tile) => droppableIdStart === tile.id);
        const items = tileStart.items.splice(droppableIndexStart, 1);
        const tileEnd = state.find((tile) => droppableIdEnd === tile.id);
        tileEnd.items.splice(droppableIndexEnd, 0, ...items);
      }

      return newState;
    }

    default:
      return state;
  }
};
export default TileReducer;
