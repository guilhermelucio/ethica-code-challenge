"use client";

import TopBar from "../top-bar";
import Column from "./components/column";
import Footer from "./footer";
import { useSystemTypesQuery } from "./queries/use-system-types-query";

import s from "./style.module.css";

export default function Board() {
  const query = useSystemTypesQuery();

  if (query.isLoading) return;
  if (query.isError) return;
  if (!query.data) return;

  return (
    <div className={s["container"]}>
      <TopBar />
      <div className={s["board"]}>
        {query.data.map((systemType) => {
          return <Column key={systemType.id} systemType={systemType} />;
        })}
      </div>
      <Footer />
    </div>
  );
}
