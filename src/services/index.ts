import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { User, Board, Tile, Template } from "../types";
import { store } from "react-notifications-component";

class FirebaseAuthService {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor() {
    this.init();
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();
  }

  private init = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId:
          process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDERS_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      });
    }
  };

  signInWithEmailAndPassword = async (
    email: string,
    password: string
  ): Promise<User> => {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.getUserData(user.user.uid);
      })
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
        return null;
      });
  };

  signInWithProvider = async (
    provider: firebase.auth.AuthProvider
  ): Promise<User> => {
    return this.auth
      .signInWithPopup(provider)
      .then(async (cred) => {
        return this.getUserData(cred.user.uid)
          .then((user) => {
            const firebaseUser = cred.user;
            if (user) return user;
            else {
              return this.createUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                name: firebaseUser.displayName,
                userImg: firebaseUser.photoURL ?? "",
              })
                .then(() => {
                  return {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                  };
                })
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
                  return null;
                });
            }
          })
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
            return null;
          });
      })
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
        return null;
      });
  };

  private createUser = async ({ email, name, uid }: User): Promise<void> => {
    const doc = await this.firestore.doc(`users/${uid}`).get();
    if (!doc.exists)
      return this.firestore
        .doc(`users/${uid}`)
        .set({
          email,
          name,
          uid,
        })
        .then((_) => {
          return;
        })
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
        });
  };

  getUserData = async (docId: string): Promise<User> => {
    return this.firestore
      .collection("users")
      .doc(docId)
      .get()
      .then((data) => {
        const { email, name, uid, recentBoard } = data.data();

        return {
          email,
          name,
          uid,
          recentBoard,
        } as User;
      })
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
        return null;
      });
  };

  getBoards = async (uid: string): Promise<Board[]> => {
    return this.firestore
      .collection(`users/${uid}/boards`)
      .orderBy("lastUpdatedAt", "desc")
      .get()
      .then((boards) => {
        return boards.docs.map((board) => board.data());
      })
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
        return null;
      });
  };

  getTiles = async (uid: string, boardId: string): Promise<Tile[]> => {
    return this.firestore
      .collection(`users/${uid}/boards/${boardId}/tiles`)
      .orderBy("position")
      .get()
      .then((tiles) => {
        return tiles.docs.map((tile) => tile.data());
      })
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
        return null;
      });
  };

  createBoard = async (userId: string, boardName: string): Promise<Board> => {
    const lastUpdatedAt = new Date();
    const createdAt = new Date();

    return this.firestore
      .collection(`users/${userId}/boards`)
      .add({
        boardId: "",
        name: boardName,
        createdAt,
        lastUpdatedAt,
      })
      .then(async (data) =>
        data
          .update({ boardId: data.id })
          .then(() => ({
            boardId: data.id,
            name: boardName,
            createdAt,
            lastUpdatedAt,
          }))
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
            return null;
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
        return null;
      });
  };

  updatedBoardUrl = async (
    userId: string,
    boardId: string,
    backgroundUrl: string
  ): Promise<boolean> => {
    return this.firestore
      .doc(`users/${userId}/boards/${boardId}`)
      .update({
        backgroundUrl,
      })
      .then(() => true)
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
        return false;
      });
  };

  updateRecentBoard = async (
    userId: string,
    recentBoard: Board
  ): Promise<boolean> => {
    return this.firestore
      .doc(`users/${userId}`)
      .update({
        recentBoard,
      })
      .then(() => true)
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
        return false;
      });
  };

  getMyTemplates = async (userId: string): Promise<Template[]> => {
    return this.firestore
      .collection("templates")
      .where("uid", "==", userId)
      .get()
      .then((data) => data.docs.map((doc) => doc.data()))
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
        return null;
      });
  };

  getAllTemplates = async (
    category: "Business" | "Design" | "Engineering" | "Sales" | "Support"
  ): Promise<Template[]> => {
    return this.firestore
      .collection("templates")
      .where("category", "==", category)
      .limit(50)
      .get()
      .then((data) => data.docs.map((doc) => doc.data()))
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
        return null;
      });
  };

  signOut = () => {
    return this.auth.signOut();
  };
}

const instance = new FirebaseAuthService();

export default instance;
