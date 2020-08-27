import React, { useEffect, useState } from "react";
import axios from "axios";
import { store } from "react-notifications-component";

interface Props {
  setWallpaperPopoverOpen: Function;
}

const WallpaperPopover = (props: Props) => {
  const [wallpapers, setWallpapers] = useState([]);

  const fetchWallpapers = async () => {
    const data = await axios
      .get(
        `https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
      )
      .then((data) => data.data)
      .catch((e) => {
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
  };

  useEffect(() => {
    fetchWallpapers();
  }, []);

  return <div></div>;
};

export default WallpaperPopover;
