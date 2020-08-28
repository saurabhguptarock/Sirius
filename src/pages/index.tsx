import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Board, User } from "../types";
import { connect } from "react-redux";
import FirebaseService from "../services";
import Link from "next/link";
import { setLoading, setError } from "../store/actions/AppStateAction";

interface Props {
  user?: User;
  appState: {
    isLoading: boolean;
    error: string;
  };
  dispatch?: Function;
}

const Home = (props: Props) => {
  const [boards, setBoards] = useState<Board[]>([]);

  const getBoards = async (uid: string) => {
    props.dispatch(setLoading(true));
    await FirebaseService.getBoards(uid)
      .then((tiles) => {
        setBoards(tiles);
        props.dispatch(setLoading(false));
      })
      .catch((e) => {
        props.dispatch(setLoading(false));
        props.dispatch(setError(e.message));
      });
  };

  useEffect(() => {
    if (props.user) {
      getBoards(props.user.uid);
    } else {
      setBoards([]);
    }
  }, [props.user]);

  return (
    <div style={{ marginTop: "4rem" }}>
      <Head>
        <title>Boards | Sirius </title>
      </Head>
      <div className="container is-fluid">
        <div className="columns mt-5">
          {!props.appState.isLoading &&
            boards.length > 0 &&
            boards.map((board) => {
              return (
                <div className="column is-3" key={board.boardId}>
                  <Link href="/boards/[id]" as={`/boards/${board.boardId}`}>
                    <a>
                      <div className="card" style={{ borderRadius: "5px" }}>
                        <div className="card-image">
                          <figure
                            className="image is-16by9"
                            style={{ position: "relative" }}
                          >
                            <img
                              src={board.backgroundUrl}
                              style={{ borderRadius: "5px" }}
                              alt="Placeholder image"
                            />
                          </figure>
                          <div
                            className="media-content"
                            style={{ position: "absolute", top: 10, left: 10 }}
                          >
                            <p className="title is-4 has-text-white">
                              {board.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, appState: state.appState };
};

export default connect(mapStateToProps)(Home);
