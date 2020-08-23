import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Board } from "../types";
import { connect } from "react-redux";
import { login } from "../store/actions/AuthAction";
import FirebaseService from "../services";
import Link from "next/link";

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
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (props.user) {
      getBoards(props.user.uid);
      if (props.user.backgroundUrl)
        document.body.style.backgroundImage = `url('${props.user.backgroundUrl}')`;
      else
        document.body.style.backgroundImage =
          "url('/assets/images/background.jpg')";
    }
  }, [props.user]);

  return (
    <div>
      <Head>
        <title>Boards | Sirius </title>
      </Head>
      <div className="columns mt-5">
        {!loading &&
          boards.length > 0 &&
          boards.map((board) => {
            return (
              <div className="column is-3" key={board.boardId}>
                <Link href="/boards/[id]" as={`/boards/${board.boardId}`}>
                  <a>
                    <div className="card" style={{ borderRadius: "5px" }}>
                      <div className="card-image">
                        <figure className="image is-4by3">
                          <img
                            src="https://bulma.io/images/placeholders/1280x960.png"
                            style={{ borderRadius: "5px 5px 0 0" }}
                            alt="Placeholder image"
                          />
                        </figure>
                      </div>
                      <div className="card-content">
                        <div className="media-content">
                          <p className="title is-4">{board.name}</p>
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
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Home);
