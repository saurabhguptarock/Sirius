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

interface Props {
  user?: User;
  dispatch?: Function;
}

const Header = (props: Props) => {
  const router = useRouter();
  const [plusPopoverOpen, setPlusPopoverOpen] = useState(false);
  const [wallpaperPopover, setWallpaperPopover] = useState(false);
  const [notificationPopover, setNotificationPopover] = useState(false);

  useEffect(() => {
    FirebaseService.auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = await FirebaseService.getUserData(user.uid);
        props.dispatch(login(userData));
      }
    });
  }, []);

  return (
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

        <div className="navbar-end">
          {props.user && (
            <React.Fragment>
              <Popover
                isOpen={plusPopoverOpen}
                position={"bottom"}
                onClickOutside={() => setPlusPopoverOpen(!plusPopoverOpen)}
                align={"start"}
                content={
                  <AddIconPopover setPlusPopoverOpen={setPlusPopoverOpen} />
                }
              >
                <a
                  className="navbar-item main"
                  onClick={() => setPlusPopoverOpen(!plusPopoverOpen)}
                >
                  <i className="fas fa-plus" style={{ fontSize: "1.3rem" }}></i>
                </a>
              </Popover>
              <a className="navbar-item main">
                <i className="fas fa-images" style={{ fontSize: "1.3rem" }}></i>
              </a>
              <a className="navbar-item main">
                <i className="fas fa-bell" style={{ fontSize: "1.3rem" }}></i>
              </a>
              <Link href="/user-profile">
                <a className="navbar-item main">
                  <i className="fas fa-user" style={{ fontSize: "1.3rem" }}></i>
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
              <div className="buttons">
                <Link href="/login">
                  <a className="button is-primary">
                    <strong>Log in</strong>
                  </a>
                </Link>
              </div>
            </div>
          )}
          {!props.user && (
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/register">
                  <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Header);
