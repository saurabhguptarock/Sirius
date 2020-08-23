import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Board } from "../types";
import { connect } from "react-redux";
import { login } from "../store/actions/AuthAction";
import FirebaseService from "../services";

const Home = (props) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBoards = async (uid: string) => {
    setLoading(true);
    await FirebaseService.getBoards(uid)
      .then((tiles) => {
        setBoards(tiles);
        setLoading(false);
        console.log(tiles);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (props.user) {
      getBoards(props.user.uid);
    }
  }, [props.user]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps, { login })(Home);
