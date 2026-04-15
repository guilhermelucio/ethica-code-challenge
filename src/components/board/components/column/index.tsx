import { SystemType } from "@/types";

import s from "./style.module.css";
import { useDataMapsQuery } from "./queries/use-data-maps-query";
import Card from "../card";
import { useEffect, useState } from "react";
import { useMoveItemMutation } from "./mutations/use-move-item-mutation";
import { useSearchParams } from "next/navigation";

type ColumnProps = {
  systemType: SystemType;
};

export default function Column({ systemType }: ColumnProps) {
  const searchParams = useSearchParams();
  const filterId = searchParams.get("id");
  const mutation = useMoveItemMutation({ systemTypeId: systemType.id });
  const query = useDataMapsQuery({ systemTypeId: systemType.id, filterId });

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    const body = document.querySelector("body");

    if (!filterId) {
      body?.style.removeProperty("--global-theme-color");
      return;
    }

    if (
      filterId &&
      query.data?.findIndex((item) => item.fides_key === filterId) !== -1
    ) {
      body?.style.setProperty("--global-theme-color", systemType.theme);
    }
  }, [filterId, systemType.theme, query.data]);

  if (query.isLoading) return;
  if (query.isError) return;
  if (!query.data) return;

  const style = {
    "--theme-color": systemType.theme,
  } as React.CSSProperties;

  return (
    <section
      style={style}
      className={`${s["container"]} ${active && s["active"]}`}
      onDragOver={(event) => {
        event.preventDefault();
        setActive(true);
      }}
      onDragLeave={() => {
        setActive(false);
      }}
      onDrop={async (event) => {
        setActive(false);

        const cardId = event.dataTransfer.getData("id") ?? "";
        if (!cardId) return;

        mutation.mutate({
          dataMapId: cardId,
        });
      }}
    >
      <header className={`${s["header"]} `}>
        <h3 style={{ color: systemType.theme }} className={s["counter"]}>
          {query.data.length}
        </h3>
        <h2 className={s["heading"]}>{systemType.name}</h2>
      </header>
      <div role="listbox" className={s["cards"]}>
        {query.data.map((dataMap) => {
          return <Card key={dataMap.fides_key} dataMap={dataMap} />;
        })}
      </div>
    </section>
  );
}
