import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FirebaseService from "../../services";
import { connect } from "react-redux";
import { Tile } from "../../types";
import Head from "next/head";

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
        console.log(tiles);
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

export default connect(mapStateToProps)(Board);
