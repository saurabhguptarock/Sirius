import { connect } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../store/actions/AuthAction";
import FirebaseService from "../services";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "../types";

interface Props {
  user?: User;
  dispatch?: Function;
}

const Header = (props: Props) => {
  const router = useRouter();

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
      className="navbar is-transparent"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
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
            <a
              className={
                router.pathname.split("/")[1] === "boards"
                  ? "navbar-item main"
                  : "navbar-item"
              }
            >
              <i className="fas fa-cog" style={{ fontSize: "1.3rem" }}></i>
            </a>
          </Link>
        </div>

        <div className="navbar-end">
          {props.user && (
            <div className="navbar-item  has-dropdown is-hoverable">
              <a
                className={
                  router.pathname.split("/")[1] === "boards"
                    ? "navbar-item main"
                    : "navbar-item"
                }
              >
                <i className="fas fa-user" style={{ fontSize: "1.3rem" }}></i>
              </a>

              <div className="navbar-dropdown">
                <Link href="/user-profile">
                  <a className="navbar-item">Profile</a>
                </Link>
                <a
                  className="navbar-item"
                  onClick={async () => {
                    await FirebaseService.signOut();
                    props.dispatch(logout());
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          )}
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
