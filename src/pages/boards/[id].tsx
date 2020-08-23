import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FirebaseService from "../../services";
import { connect } from "react-redux";
import { Tile } from "../../types";
import Head from "next/head";
import SiriusList from "../../components/SiriusList";
import { DragDropContext } from "react-beautiful-dnd";
import SiriusActionButton from "../../components/SiriusActionButton";

const Board = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getTiles = async (uid: string, boardId: string) => {
    setLoading(true);
    await FirebaseService.getTiles(uid, boardId)
      .then((tiles) => {
        setTiles(tiles);
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

  const onDragEnd = () => {
    // TODO: implement
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns mt-5">
          {!loading &&
            tiles.length > 0 &&
            tiles.map((tile) => (
              <SiriusList
                key={tile.id}
                title={tile.title}
                tileId={tile.id}
                cards={tile.items}
              />
            ))}
          <SiriusActionButton list={true} />
        </div>
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Board);
