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
  const [deleteBoardHover, setDeleteBoardHover] = useState<boolean[]>([]);
  const [showBoardDeleteConfirm, setShowBoardDeleteConfirm] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState("");

  const getBoards = async (uid: string) => {
    props.dispatch(setLoading(true));
    await FirebaseService.getBoards(uid)
      .then((tiles) => {
        setBoards(tiles);
        let d: boolean[] = [];
        for (let i = 0; i < tiles.length; i++) {
          d.push(false);
        }
        setDeleteBoardHover(d);
        props.dispatch(setLoading(false));
      })
      .catch((e) => {
        props.dispatch(setLoading(false));
        props.dispatch(setError(e.message));
      });
  };

  const handleDeleteBoard = async () => {
    await FirebaseService.deleteBoard(props.user?.uid, deleteBoardId);
    setShowBoardDeleteConfirm(false);
    await getBoards(props.user?.uid);
  };

  useEffect(() => {
    if (props.user) {
      getBoards(props.user.uid);
    } else {
      setBoards([]);
    }
  }, [props.user]);

  return (
    <div>
      <Head>
        <title>Boards | Sirius </title>
      </Head>
      <div className="container is-fluid">
        <div className="columns mt-5">
          {!props.appState.isLoading &&
            boards.length > 0 &&
            boards.map((board, boardNo) => {
              return (
                <div
                  className="column is-3"
                  key={board.boardId}
                  onClick={(e) =>
                    FirebaseService.updateRecentBoard(props.user.uid, board)
                  }
                  onMouseEnter={(e) => {
                    let d: boolean[] = [];
                    for (let i = 0; i <= boards.length - 1; i++) {
                      d.push(false);
                    }
                    d.splice(boardNo, 1, true);
                    setDeleteBoardHover(d);
                  }}
                  onMouseLeave={(e) => {
                    let d: boolean[] = [];
                    for (let i = 0; i <= boards.length - 1; i++) {
                      d.push(false);
                    }
                    setDeleteBoardHover(d);
                  }}
                >
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
                          {deleteBoardHover[boardNo] && (
                            <div
                              className="media-content"
                              style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                setShowBoardDeleteConfirm(true);
                                setDeleteBoardId(boards[boardNo].boardId);
                              }}
                            >
                              <p className="title is-6 has-text-white">
                                <i className="fas fa-trash"></i>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <div className={showBoardDeleteConfirm ? "modal is-active" : "modal"}>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            left: 0,
            bottom: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
          onClick={() => {
            setShowBoardDeleteConfirm(false);
            setDeleteBoardId("");
          }}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setShowBoardDeleteConfirm(false);
                setDeleteBoardId("");
              }}
            ></button>
          </header>

          <footer className="modal-card-foot">
            <button className="button is-danger" onClick={handleDeleteBoard}>
              Delete Board
            </button>
            <button
              className="button"
              onClick={() => {
                setShowBoardDeleteConfirm(false);
                setDeleteBoardId("");
              }}
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

export default connect(mapStateToProps)(Home);
