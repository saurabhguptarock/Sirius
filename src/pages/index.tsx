import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Board } from "../types";
import { connect } from "react-redux";
import FirebaseService from "../services";
import Link from "next/link";
import { motion } from "framer-motion";

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
    }
  }, [props.user]);

  return (
    <div>
      <Head>
        <title>Boards | Sirius </title>
      </Head>
      <div className="container is-fluid">
        <div className="columns mt-5">
          {!loading &&
            boards.length > 0 &&
            boards.map((board) => {
              return (
                <div className="column is-3" key={board.boardId}>
                  <Link href="/boards/[id]" as={`/boards/${board.boardId}`}>
                    <a>
                      <div className="card" style={{ borderRadius: "3px" }}>
                        <div className="card-image">
                          <figure
                            className="image is-16by9"
                            style={{ position: "relative" }}
                          >
                            <img
                              src="/assets/images/background.jpg"
                              style={{ borderRadius: "3px" }}
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
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Home);
