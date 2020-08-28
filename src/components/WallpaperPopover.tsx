import React, { useEffect, useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";
import { connect } from "react-redux";
import { User, Wallpaper } from "../types";

interface Props {
  setWallpaperPopoverOpen: Function;
  user?: User;
}

const WallpaperPopover = (props: Props) => {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("backgrounds");
  // const

  const fetchWallpapers = async () => {
    setLoading(true);
    const data: Wallpaper[] = await axios
      .get(
        `https://api.unsplash.com/search/photos/?page=1&query=${query}&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
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
    if (data) setWallpapers(data);
    console.log(data[2].urls.full);
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  const handleBackgroundUrlUpdate = (idx: number) => {
    props.setWallpaperPopoverOpen(false);
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Create</p>
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
