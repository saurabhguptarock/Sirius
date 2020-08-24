import FirebaseService from "../../services";
import firebase from "firebase/app";
import { store } from "react-notifications-component";
import { Tile } from "../../types";

export const ADD_BOARD = "ADD_BOARD";
export const ADD_TILE = "ADD_TILE";
export const ADD_CARD = "ADD_CARD";
export const DRAG_END = "DRAG_END";

export const addBoardToStore = (tiles: Tile[]) => {
  if (tiles)
    return {
      type: ADD_BOARD,
      tiles,
    };
};

export const addTile = (title: string) => async (dispatch) => {
  // await FirebaseService.firestore
  //   .doc(`users/${userId}/boards/${boardId}/tiles/${tileId}`)
  //   .set(
  //     {
  //       id: String(tileId),
  //       title,
  //       items: [],
  //     },
  //     { merge: false }
  //   )
  //   .then((data) =>
  //     dispatch({
  //       type: ADD_TILE,
  //       payload: {
  //         id: tileId,
  //         title,
  //       },
  //     })
  //   )
  //   .catch((e) => {
  //     store.addNotification({
  //       title: "Some error occurred",
  //       message: e.message,
  //       type: "danger",
  //       insert: "top",
  //       animationIn: ["animated", "fadeIn"],
  //       animationOut: ["animated", "fadeOut"],
  //       container: "top-right",
  //       dismiss: {
  //         duration: 5000,
  //         click: false,
  //       },
  //     });
  //     return;
  //   });
  // TODO:Change to dynamic id
  return dispatch({
    type: ADD_TILE,
    payload: {
      id: "sd3fa90po23df89sfa4ds65454u8afa2",
      title,
    },
  });
};

export const addCard = (
  tileId: string,
  title: string,
  cardPosition: number
) => async (dispatch) => {
  // TODO : Revert changes in store if update fails
  return dispatch({
    type: ADD_CARD,
    payload: {
      tileId,
      title,
      cardPosition,
    },
  });
  // await FirebaseService.firestore
  //   .doc(`users/${userId}/boards/${boardId}/tiles/${tileId}`)
  //   .update({
  //     items: firebase.firestore.FieldValue.arrayUnion({
  //       cardId: `card-${tilePosition}-${cardPosition}`,
  //       title,
  //       position: cardPosition,
  //     }),
  //   })
  //   .then(() => {})
  //   .catch((e) => {
  //     store.addNotification({
  //       title: "Some error occurred",
  //       message: e.message,
  //       type: "danger",
  //       insert: "top",
  //       animationIn: ["animated", "fadeIn"],
  //       animationOut: ["animated", "fadeOut"],
  //       container: "top-right",
  //       dismiss: {
  //         duration: 5000,
  //         click: false,
  //       },
  //     });
  //     return;
  //   });
};

export const sortTile = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: DRAG_END,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};
