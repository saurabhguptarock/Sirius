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
import { setLoading, setError } from "../../store/actions/AppStateAction";

interface Props {
  tiles: Tile[];
  user?: User;
  dispatch?: Function;
  appState: {
    isLoading: boolean;
    error: string;
  };
}
// TODO:update recent board on new board click
const Board = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;

  const [modalActive, setModalActive] = useState(false);

  const [modalData, setModalData] = useState<Item>({
    title: "",
    cardId: "",
  });

  const getTiles = async (uid: string, boardId: string) => {
    props.dispatch(setLoading(true));
    await FirebaseService.getTiles(uid, boardId)
      .then((tiles) => {
        props.dispatch(addBoardToStore(tiles));
        props.dispatch(setLoading(false));
      })
      .catch((e) => {
        props.dispatch(setLoading(false));
        setError(e.message);
      });
  };

  useEffect(() => {
    if (!props.user) {
      router.push("/login");
    } else {
      getTiles(props.user.uid, id as string);
      if (props.user.recentBoard?.backgroundUrl) {
        document.body.style.backgroundImage = `url('${props.user.recentBoard?.backgroundUrl}')`;
        document.body.style.objectFit = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
      }
    }
    return () => (document.body.style.backgroundImage = "none");
  }, [props.user, id]);

  useEffect(() => {
    document.body.style.backgroundImage = `url('${props.user?.recentBoard?.backgroundUrl}')`;
    document.body.style.objectFit = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }, [props.user?.recentBoard, props.user?.recentBoard?.backgroundUrl]);

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
              className="columns"
            >
              {!props.appState.isLoading &&
                props.tiles.length > 0 &&
                props.tiles.map((tile: Tile, i) => (
                  <SiriusList
                    key={tile.id}
                    tile={tile}
                    idx={i}
                    userId={props.user?.uid}
                    boardId={id as string}
                    setModalActive={setModalActive}
                    setModalData={setModalData}
                  />
                ))}
              {provided.placeholder}
              <div style={{ paddingRight: "50px" }} className="mt-5">
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
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            left: 0,
            bottom: 0,
            position: "absolute",
            right: 0,
            top: 0,
          }}
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
          <section className="modal-card-body">{modalData.title}</section>
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
  return {
    user: state.auth.user,
    tiles: state.tiles,
    appState: state.appState,
  };
};

export default connect(mapStateToProps)(Board);
