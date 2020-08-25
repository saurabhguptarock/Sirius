import { connect } from "react-redux";
import { useEffect } from "react";
import { login, logout } from "../store/actions/AuthAction";
import FirebaseService from "../services";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

  useEffect(() => {
    FirebaseService.auth.onAuthStateChanged((user) => {
      if (user) props.login(user.uid);
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
          <Link href="/add-products">
            <a
              className={
                router.pathname.split("/")[1] === "boards"
                  ? "navbar-item main"
                  : "navbar-item"
              }
            >
              Add Products
            </a>
          </Link>
          <Link href="/orders">
            <a
              className={
                router.pathname.split("/")[1] === "boards"
                  ? "navbar-item main"
                  : "navbar-item"
              }
            >
              Orders
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
                <a className="navbar-item" onClick={props.logout}>
                  Logout
                </a>
              </div>
            </div>
          )}
          {!props.user && (
            <div className="navbar-item">
              <div className="buttons">
                <Link href="/login">
                  <motion.a
                    className="button is-primary"
                    whileHover={{ scale: 1.05 }}
                  >
                    <strong>Log in</strong>
                  </motion.a>
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

export default connect(mapStateToProps, { login, logout })(Header);
