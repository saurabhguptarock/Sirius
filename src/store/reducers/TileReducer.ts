import { ADD_CARD, ADD_TILE, DRAG_END, ADD_BOARD } from "../actions/TileAction";
import { Tile, Item } from "../../types";

const initialState: Tile[] = [];

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
        position: action.payload.position,
        items: action.payload.items,
      };
      return [...state, newList];
    }

    case ADD_CARD: {
      const newCard: Item = {
        title: action.payload.title,
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

    case DRAG_END: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type,
      } = action.payload;
      let newState = [...state];

      // Dragging tiles
      if (type === "tile") {
        const tiles = newState.splice(droppableIndexStart, 1)[0];
        newState.splice(droppableIndexEnd, 0, tiles);
        let newTiles: Tile[] = [];

        for (let i = 0; i < newState.length; i++) {
          const tile = newState[i];
          let items = [];
          for (let j = 0; j < tile.items.length; j++) {
            const item = tile.items[j];
            items.push({
              cardId: `card-${i}-${j}`,
              title: item.title,
            });
          }
          newTiles.push({
            id: tile.id,
            items,
            position: i,
            title: tile.title,
          });
        }

        return newTiles;
      }

      // In same Tile
      if (droppableIdStart === droppableIdEnd) {
        let tile = state.find((tile) => droppableIdStart === tile.id);
        let item = tile.items.splice(droppableIndexStart, 1)[0];
        tile.items.splice(droppableIndexEnd, 0, item);
        let items = [];
        for (let i = 0; i < tile.items.length; i++) {
          const item = tile.items[i];
          items.push({
            cardId: `card-${tile.position}-${i}`,
            title: item.title,
          });
        }
        tile.items = items;
        newState.splice(tile.position, 1, tile);
        return newState;
      }

      // In other Tile
      if (droppableIdStart !== droppableIdEnd) {
        const tileStart = state.find((tile) => droppableIdStart === tile.id);
        const item = tileStart.items.splice(droppableIndexStart, 1)[0];
        const tileEnd = state.find((tile) => droppableIdEnd === tile.id);
        tileEnd.items.splice(droppableIndexEnd, 0, item);

        let tileStartItems = [];
        let tileEndItems = [];
        for (let i = 0; i < tileStart.items.length; i++) {
          const item = tileStart.items[i];
          tileStartItems.push({
            cardId: `card-${tileStart.position}-${i}`,
            title: item.title,
          });
        }
        for (let i = 0; i < tileEnd.items.length; i++) {
          const item = tileEnd.items[i];
          tileEndItems.push({
            cardId: `card-${tileEnd.position}-${i}`,
            title: item.title,
          });
        }
        tileStart.items = tileStartItems;
        tileEnd.items = tileEndItems;

        // TODO : Check why i put it here
        // if (tileStart.position > tileEnd.position) {
        //   newState.splice(tileEnd.position, 2, tileEnd, tileStart);
        // } else {
        //   newState.splice(tileStart.position, 2, tileStart, tileEnd);
        // }

        return newState;
      } else return newState;
    }

    default:
      return state;
  }
};
export default TileReducer;
