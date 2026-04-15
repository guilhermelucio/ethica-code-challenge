"use client";

import { useSearchParams } from "next/navigation";

import s from "./style.module.css";

export default function Footer() {
  const searchParams = useSearchParams();
  const filterId = searchParams.get("id");

  if (!filterId) return;

  return (
    <footer className={s["footer"]}>
      <h4 className={s["heading"]}>
        <strong>Filter legend</strong>
      </h4>
      <div className={s["content"]}>
        <div className={`${s["legend"]} ${s["active"]}`}>Reference item</div>
        <div className={s["legend"]}>Related items</div>
      </div>
    </footer>
  );
}
