import Head from "next/head";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { statuses, Tile } from "../types";
import FirebaseService from "../services";

export default function Home() {
  const [items, setItems] = useState<Tile[]>([
    {
      id: "1",
      status: "open",
      title: "Human Interest Form",
      content: "Fill out human interest distribution form",
    },
    {
      id: "2",
      status: "open",
      title: "Purchase present",
      content: "Get an anniversary gift",
    },
    {
      id: "3",
      status: "open",
      title: "Invest in investments",
      content: "Call the bank to talk about investments",
    },
    {
      id: "4",
      status: "open",
      title: "Daily reading",
      content: "Finish reading Intro to UI/UX",
    },
  ]);

  useEffect(() => {
    const tiles: Tile[] = FirebaseService.getTiles("");
    setItems(tiles);
  }, []);

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);
    console.log(item);
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className="columns">
        {statuses.map((s) => {
          return (
            <div key={s.status} className="column col-wrapper">
              <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
              <DropWrapper onDrop={onDrop} status={s.status}>
                {/* @ts-ignore */}
                <Col>
                  {items
                    .filter((i) => i.status === s.status)
                    .map((i, idx) => (
                      <Item
                        key={i.id}
                        item={i}
                        index={idx}
                        moveItem={moveItem}
                        status={s}
                      />
                    ))}
                </Col>
              </DropWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
}
