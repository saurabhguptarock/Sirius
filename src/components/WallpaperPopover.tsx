import React, { useEffect, useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import { connect } from "react-redux";
import { User, Wallpaper } from "../types";
import { login } from "../store/actions/AuthAction";
import FirebaseService from "../services";

interface Props {
  setWallpaperPopoverOpen: Function;
  user?: User;
  dispatch?: Function;
}

const WallpaperPopover = (props: Props) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchWallpapers = async () => {
    setLoading(true);
    const data: Wallpaper[] = await axios
      .get(
        `https://api.unsplash.com/search/photos/?page=${page}&per_page=30&query=backgrounds&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
      )
      .then((data) => {
        setLoading(false);
        return data.data.results;
      })
      .catch((e) => {
        setLoading(false);
        store.addNotification({
          title: "Some error occurred",
          message: e.message,
          type: "danger",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          container: "top-right",
          dismiss: {
            duration: 5000,
            click: false,
          },
        });
        return null;
      });
    if (data) setWallpapers((wall) => [...wall, ...data]);
  };

  useEffect(() => {
    fetchWallpapers();
  }, [page]);

  const handleBackgroundUrlUpdate = async (idx: number) => {
    const res = await FirebaseService.updatedBoardUrl(
      props.user.uid,
      props.user.recentBoard.boardId,
      wallpapers[idx].urls.full
    );
    if (res) {
      props.setWallpaperPopoverOpen(false);
      props.dispatch(
        login({
          email: props.user.email,
          name: props.user.name,
          uid: props.user.uid,
          recentBoard: {
            backgroundUrl: wallpapers[idx].urls.full,
            boardId: props.user.recentBoard.boardId,
            createdAt: props.user.recentBoard.createdAt,
            lastUpdatedAt: props.user.recentBoard.lastUpdatedAt,
            name: props.user.recentBoard.name,
          },
        })
      );
    }
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Wallpapers</p>
        <a className="card-header-icon" aria-label="more options">
          <button
            className="delete"
            aria-label="close"
            onClick={() => props.setWallpaperPopoverOpen(false)}
          ></button>
        </a>
      </header>
      <div
        style={{
          backgroundColor: "transparent",
          width: "350px",
          maxHeight: "80vh",
          minHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="grid-wallpaper pr-2 pt-2">
          {!loading &&
            wallpapers.length > 0 &&
            wallpapers.map((wallpaper, i) => (
              <div
                key={wallpaper.id}
                className="wallpaper-hover-tile pl-2"
                onClick={(e) => {
                  handleBackgroundUrlUpdate(i);
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  src={wallpaper.urls.small}
                  alt={wallpaper.alt_description}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(WallpaperPopover);
