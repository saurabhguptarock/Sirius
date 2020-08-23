import FirebaseService from "../services";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../store/actions/AuthAction";
import router from "next/router";

const Login = (props) => {
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [passValid, setPassValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleLogin = async (e) => {
    if (email != "" && pass != "") {
      e.preventDefault();
      const uid = await FirebaseService.signInWithEmailAndPassword(email, pass);
      if (uid != null) props.login(uid);
    }
  };

  useEffect(() => {
    if (props.user) {
      router.push("/");
    }
  }, [props.user]);

  return (
    <section className="hero" style={{ marginTop: "100px" }}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form action="" className="box">
                <div className="field">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      onChange={(val) => {
                        if (
                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/.test(
                            val.target.value
                          )
                        )
                          setEmailValid(true);
                        else setEmailValid(false);
                        setEmail(val.target.value);
                      }}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      id="password"
                      placeholder="*******"
                      className="input"
                      onChange={(val) => {
                        if (val.target.value.length > 4) setPassValid(true);
                        else setPassValid(false);
                        setPass(val.target.value);
                      }}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="remember" className="checkbox">
                    <input id="remember" type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div className="field">
                  <button
                    className="button is-success"
                    type="submit"
                    onClick={handleLogin}
                    disabled={!emailValid || !passValid}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { login })(Login);
