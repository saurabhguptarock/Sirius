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
      <div className="columns mt-5">
        {!loading &&
          tiles.length > 0 &&
          tiles.map((tile) => {
            return (
              <div className="column is-3" key={tile.id}>
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
                      <p className="title is-4">{tile.title}</p>
                    </div>
                  </div>
                </div>
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

export default connect(mapStateToProps)(Board);
