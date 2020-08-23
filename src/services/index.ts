import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import { User, Tile } from "../types";
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
        const { email, name, uid } = data.data();

        return {
          email,
          name,
          uid,
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
  };

  getTiles = (uid: string): Tile[] => {
    return [
      {
        id: "1",
        status: "open",
        title: "Human Interest Form",
        content: "Fill out human interest distribution form",
      },
      {
        id: "2",
        status: "open",
        title: "Purchase present",
        content: "Get an anniversary gift",
      },
      {
        id: "3",
        status: "open",
        title: "Invest in investments",
        content: "Call the bank to talk about investments",
      },
      {
        id: "4",
        status: "open",
        title: "Daily reading",
        content: "Finish reading Intro to UI/UX",
      },
    ];
  };

  signOut = () => {
    return this.auth.signOut();
  };
}

const instance = new FirebaseAuthService();

export default instance;
