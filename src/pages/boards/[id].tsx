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

  const getTiles = async (uid: string, boardId: string) => {
    setLoading(false);
    // await FirebaseService.getTiles(uid, boardId)
    //   .then((tiles) => {
    // props.addBoardToStore(tiles);
    //   setLoading(false);
    // })
    // .catch((e) => {
    //   setLoading(false);
    //   setError(e.message);
    // });
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    console.log({
      sourceDroppableId: source.droppableId,
      destinationDroppableId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    });
    props.dispatch(
      sortTile(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        type
      )
    );
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns mt-5">
          {!loading &&
            props.tiles.length > 0 &&
            props.tiles.map((tile: Tile) => (
              <SiriusList key={tile.id} tile={tile} />
            ))}
          <SiriusActionButton isList={true} />
        </div>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user, tiles: state.tiles };
};

export default connect(mapStateToProps)(Board);
