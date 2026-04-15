"use client";

import { DataMap } from "@/types";
import s from "./style.module.css";
import { useMemo, useState } from "react";
import { AiFillFilter } from "react-icons/ai";
import Badges from "./components/badges";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CardProps = {
  dataMap: DataMap;
};

export default function Card({ dataMap }: CardProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [expanded, setExpanded] = useState<boolean>(false);

  const filterClassname = useMemo(() => {
    if (!id) return "";
    return id === dataMap.fides_key ? s["filter-root"] : s["filter-related"];
  }, [id, dataMap.fides_key]);

  return (
    <section
      draggable
      role="listitem"
      className={`${s["container"]} ${filterClassname}`}
      onDragStart={(event) => {
        event.dataTransfer.setData("id", dataMap.fides_key);
      }}
    >
      <header className={s["header"]}>
        <hgroup>
          <h4>{dataMap.name}</h4>
          <h5>
            <small>{dataMap.fides_key}</small>
          </h5>
        </hgroup>
        {!id ? (
          <Link href={`/?id=${dataMap.fides_key}`}>
            <AiFillFilter className={s["icon"]} />
          </Link>
        ) : (
          <span>{id === dataMap.fides_key ? "" : "Related"}</span>
        )}
      </header>
      <div>{dataMap.description}</div>
      <hr className={s["fold"]} />
      <div>
        <button
          type="button"
          className={s["show-more"]}
          onClick={() => {
            setExpanded((prevState) => !prevState);
          }}
        >
          Show {expanded ? `less` : "more"}
        </button>
      </div>
      {expanded && (
        <div>
          <section className={s["details"]}>
            <header>
              <h4 className={s["heading"]}>Privacy declarations</h4>
            </header>
            <div className={s["declarations"]}>
              {!dataMap.privacy_declarations.length ? (
                <div className={s["details"]}>
                  <span>N/A</span>
                </div>
              ) : (
                <>
                  {dataMap.privacy_declarations.map((item) => {
                    return (
                      <section className={s["details"]} key={item.name}>
                        <header>
                          <h4 className={s["heading"]}>{item.name}</h4>
                        </header>
                        <Badges
                          title="Categories"
                          list={item.data_categories}
                        />
                        <Badges title="Subjects" list={item.data_subjects} />
                      </section>
                    );
                  })}
                </>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
