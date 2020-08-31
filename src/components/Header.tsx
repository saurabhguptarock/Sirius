import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { login, logout } from "../store/actions/AuthAction";
import FirebaseService from "../services";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "../types";
import React from "react";
import Popover from "react-tiny-popover";
import AddIconPopover from "./AddIconPopover";
import WallpaperPopover from "./WallpaperPopover";
import NotificationPopover from "./NotificationPopover";
import { store } from "react-notifications-component";
import { Notification } from "../types";
import { objectIsEquivalent } from "../helpers";

interface Props {
  user?: User;
  dispatch?: Function;
  appState: {
    isLoading: boolean;
    error: string;
  };
}

const Header = (props: Props) => {
  const router = useRouter();
  const [plusPopoverOpen, setPlusPopoverOpen] = useState(false);
  const [wallpaperPopoverOpen, setWallpaperPopoverOpen] = useState(false);
  const [notificationPopoverOpen, setNotificationPopoverOpen] = useState(false);

  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleCreateBoard = async () => {
    if (!boardName) return;
    const res = await FirebaseService.createBoard(props.user.uid, boardName);
    if (res) {
      setShowCreateBoard(false);
      router.push("/boards/[id]", `/boards/${res.boardId}`);
      store.addNotification({
        title: "Some error occurred",
        message: "Board Created Successfully",
        type: "success",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        container: "top-right",
        dismiss: {
          duration: 5000,
          click: false,
        },
      });
    }
  };

  const handleRequestNotification = async (notification: Notification) => {
    if (window.Notification.permission === "default") {
      await window.Notification.requestPermission();
    } else if (window.Notification.permission === "granted") {
      // new window.Notification("Sirius", {
      //   image: "/assets/images/loader-static.svg",
      // });
    }
  };

  useEffect(() => {
    FirebaseService.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await FirebaseService.getUserData(user.uid);
        props.dispatch(login(userData));
      } else {
        props.dispatch(logout());
      }
    });
    if (props.user) {
      const snap = FirebaseService.firestore
        .doc(`users/${props.user.uid}`)
        .onSnapshot((snap) => {
          if (!objectIsEquivalent(props.user, snap.data()))
            props.dispatch(login(snap.data() as User));
        });
      return () => snap();
    }
  }, []);

  useEffect(() => {
    if (props.user) {
      const snap = FirebaseService.firestore
        .collection(`users/${props.user.uid}/notifications`)
        .orderBy("createdAt")
        .onSnapshot((snap) => {
          if (
            !objectIsEquivalent(
              notifications,
              snap.docs.map((doc) => doc.data())
            )
          ) {
            setNotifications(
              snap.docs.map((doc) => doc.data() as Notification)
            );
            handleRequestNotification(snap.docs[0].data() as Notification);
          }
        });
      return () => snap();
    }
  }, [props.user, setNotifications]);

  return (
    <div>
      <nav
        className="navbar is-transparent is-fixed-top-desktop"
        role="navigation"
        aria-label="main navigation"
        style={{
          backgroundColor:
            router.pathname.split("/")[1] === "boards"
              ? "rgba(0,0,0,0.6)"
              : "#026AA7",
        }}
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item main">
              <i className="fas fa-home" style={{ fontSize: "1.3rem" }}></i>
            </a>
          </Link>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link href="/settings">
              <a className="navbar-item main">
                <i className="fas fa-cog" style={{ fontSize: "1.3rem" }}></i>
              </a>
            </Link>
          </div>

          <div className="navbar-item" style={{ padding: 0 }}>
            <Link href="/">
              <a className="navbar-item main" style={{ padding: 0 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      props.appState.isLoading
                        ? "/assets/images/loader-animated.svg"
                        : "/assets/images/loader-static.svg"
                    }
                    alt="Loader Static"
                  />
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "1.8rem",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    Sirius
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="navbar-end">
            {props.user && (
              <React.Fragment>
                <Popover
                  isOpen={plusPopoverOpen}
                  position={"bottom"}
                  onClickOutside={() => setPlusPopoverOpen(!plusPopoverOpen)}
                  align={"start"}
                  content={
                    <AddIconPopover
                      setPlusPopoverOpen={setPlusPopoverOpen}
                      setShowCreateBoard={setShowCreateBoard}
                    />
                  }
                >
                  <a
                    className="navbar-item main"
                    onClick={() => setPlusPopoverOpen(!plusPopoverOpen)}
                  >
                    <i
                      className="fas fa-plus"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  </a>
                </Popover>
                <Popover
                  isOpen={wallpaperPopoverOpen}
                  position={"bottom"}
                  onClickOutside={() =>
                    setWallpaperPopoverOpen(!wallpaperPopoverOpen)
                  }
                  align={"start"}
                  content={
                    <WallpaperPopover
                      setWallpaperPopoverOpen={setWallpaperPopoverOpen}
                    />
                  }
                >
                  <a
                    className="navbar-item main"
                    onClick={() =>
                      setWallpaperPopoverOpen(!wallpaperPopoverOpen)
                    }
                  >
                    <i
                      className="fas fa-images"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  </a>
                </Popover>
                <Popover
                  isOpen={notificationPopoverOpen}
                  position={"bottom"}
                  onClickOutside={() =>
                    setNotificationPopoverOpen(!notificationPopoverOpen)
                  }
                  align={"start"}
                  content={
                    <NotificationPopover
                      setNotificationPopoverOpen={setNotificationPopoverOpen}
                      notifications={notifications}
                    />
                  }
                >
                  <a
                    className="navbar-item main"
                    onClick={() =>
                      setNotificationPopoverOpen(!notificationPopoverOpen)
                    }
                  >
                    <i
                      className="fas fa-bell"
                      style={{ fontSize: "1.3rem", position: "relative" }}
                    >
                      {notifications.filter((not) => !not.markedAsRead).length >
                        0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-8px",
                            right: "-10px",
                            padding: "2px 6px",
                            borderRadius: "50%",
                            background: "#E90C59",
                            color: "white",
                            fontSize: "14px",
                          }}
                        >
                          {
                            notifications.filter((not) => !not.markedAsRead)
                              .length
                          }
                        </span>
                      )}
                    </i>
                  </a>
                </Popover>
                <Link href="/users/[uid]" as={`/users/${props.user.uid}`}>
                  <a className="navbar-item main">
                    <i
                      className="fas fa-user"
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  </a>
                </Link>
                <a
                  className="navbar-item main"
                  onClick={async () => {
                    await FirebaseService.signOut();
                    props.dispatch(logout());
                  }}
                >
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </a>
              </React.Fragment>
            )}
            ;
            {!props.user && (
              <div className="navbar-item">
                <Link href="/login">
                  <a className="button is-primary" style={{ height: "37px" }}>
                    <strong>Log in</strong>
                  </a>
                </Link>
              </div>
            )}
            {!props.user && (
              <div className="navbar-item">
                <Link href="/register">
                  <a className="button is-primary" style={{ height: "37px" }}>
                    <strong>Sign up</strong>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div className={showCreateBoard ? "modal is-active" : "modal"}>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            left: 0,
            bottom: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={() => setShowCreateBoard(false)}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setShowCreateBoard(false)}
            ></button>
          </header>
          <section className="modal-card-body">
            <input
              className="input"
              type="text"
              value={boardName}
              placeholder="Text input"
              onChange={(e) => setBoardName(e.target.value)}
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleCreateBoard}>
              Create Board
            </button>
            <button
              className="button"
              onClick={() => setShowCreateBoard(false)}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, appState: state.appState };
};

export default connect(mapStateToProps)(Header);
