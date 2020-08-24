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

export const addTile = (
  userId: string,
  boardId: string,
  title: string,
  position: number
) => async (dispatch) => {
  await FirebaseService.firestore
    .collection(`users/${userId}/boards/${boardId}/tiles`)
    .add({
      id: "",
      title,
      position,
      items: [],
    })
    .then(
      async (data) =>
        await data
          .update({ id: data.id })
          .then(() =>
            dispatch({
              type: ADD_TILE,
              payload: {
                id: data.id,
                title,
                position,
                items: [],
              },
            })
          )
          .catch((e) => {
            store.addNotification({
              title: "Some error occurred",
              message: e.message,
              type: "danger",
              insert: "top",
              animationIn: ["animated", "fadeIn"],
              animationOut: ["animated", "fadeOut"],
              container: "top-right",
              dismiss: {
                duration: 5000,
                click: false,
              },
            });
            return;
          })
    )
    .catch((e) => {
      store.addNotification({
        title: "Some error occurred",
        message: e.message,
        type: "danger",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        container: "top-right",
        dismiss: {
          duration: 5000,
          click: false,
        },
      });
      return;
    });
};

export const addCard = (
  userId: string,
  boardId: string,
  tileId: string,
  title: string,
  cardPosition: number,
  tilePosition: number
) => async (dispatch) => {
  // TODO : Revert changes in store if update fails
  dispatch({
    type: ADD_CARD,
    payload: {
      tileId,
      title,
      cardPosition,
      tilePosition,
    },
  });
  await FirebaseService.firestore
    .doc(`users/${userId}/boards/${boardId}/tiles/${tileId}`)
    .update({
      items: firebase.firestore.FieldValue.arrayUnion({
        cardId: `card-${tilePosition}-${cardPosition}`,
        title,
      }),
    })
    .then(() => {})
    .catch((e) => {
      store.addNotification({
        title: "Some error occurred",
        message: e.message,
        type: "danger",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        container: "top-right",
        dismiss: {
          duration: 5000,
          click: false,
        },
      });
      return;
    });
};

export const sortTile = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  type
) => {
  return {
    type: DRAG_END,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      type,
    },
  };
};
