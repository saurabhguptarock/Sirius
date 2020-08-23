import Head from "next/head";
import React, { useState, useEffect } from "react";
import { statuses, Board } from "../types";
import FirebaseService from "../services";

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getBoards = async (uid: string) => {
    setLoading(true);
    await FirebaseService.getBoards(uid)
      .then((tiles) => {
        setBoards(tiles);
        setLoading(false);
        console.log(tiles);
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  useEffect(() => {
    getBoards("IKw76VolUZSsLc9sfMvyc8oIr9X2");
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
    </div>
  );
}
