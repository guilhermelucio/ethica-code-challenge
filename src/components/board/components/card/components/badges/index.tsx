"use client";

import s from "./style.module.css";

type BadgesProps = {
  title: string;
  list: string[];
};

export default function Badges({ title, list }: BadgesProps) {
  return (
    <section className={s["container"]}>
      <header>
        <h4 className={s["heading"]}>{title}</h4>
      </header>
      <ul className={s["list"]}>
        {list.map((item, index) => {
          const itemArr = item.split(".");
          const text = itemArr.length === 1 ? item : itemArr.at(-1);
          return (
            <li className={s["item"]} key={index}>
              {text}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
