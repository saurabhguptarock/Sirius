import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FirebaseService from "../../services";
import { connect } from "react-redux";
import { Tile, Item, User } from "../../types";
import Head from "next/head";
import SiriusList from "../../components/SiriusList";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import SiriusActionButton from "../../components/SiriusActionButton";
import { sortTile, addBoardToStore } from "../../store/actions/TileAction";

interface Props {
  tiles: Tile[];
  user?: User;
  dispatch?: Function;
}

const Board = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalActive, setModalActive] = useState(true);

  const getTiles = async (uid: string, boardId: string) => {
    setLoading(true);
    await FirebaseService.getTiles(uid, boardId)
      .then((tiles) => {
        props.dispatch(addBoardToStore(tiles));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    if (!props.user) {
      router.push("/login");
    } else {
      getTiles(props.user.uid, id as string);
      if (props.user.backgroundUrl)
        document.body.style.backgroundImage = `url('${props.user.backgroundUrl}')`;
      else
        document.body.style.backgroundImage =
          "url('/assets/images/background.jpg')";
    }
  }, [props.user]);

  useEffect(
    () => () => {
      document.body.style.backgroundImage = "none";
    },
    []
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    props.dispatch(
      sortTile(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        type,
        props.user.uid,
        id as string
      )
    );
  };

  return (
    <div>
      <Head>
        <title>Board | {id}</title>
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-list" direction="horizontal" type="tile">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="columns mt-5"
            >
              {!loading &&
                props.tiles.length > 0 &&
                props.tiles.map((tile: Tile, i) => (
                  <SiriusList
                    key={tile.id}
                    tile={tile}
                    idx={i}
                    userId={props.user?.uid}
                    boardId={id as string}
                    setModalActive={setModalActive}
                  />
                ))}
              {provided.placeholder}
              <div style={{ paddingRight: "50px" }}>
                <SiriusActionButton
                  isTile={true}
                  userId={props.user?.uid}
                  boardId={id as string}
                  noOfTiles={props.tiles.length}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={modalActive ? "modal is-active" : "modal"}>
        <div
          className="modal-background"
          onClick={() => setModalActive(false)}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModalActive(false)}
            ></button>
          </header>
          <section className="modal-card-body"></section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button" onClick={() => setModalActive(false)}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, tiles: state.tiles };
};

export default connect(mapStateToProps)(Board);
