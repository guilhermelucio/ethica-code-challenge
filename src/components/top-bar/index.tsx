"use client";

import { useSearchParams } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import s from "./style.module.css";
import Link from "next/link";

export default function TopBar() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className={s["container"]}>
      <header>
        <h1 className={s["heading"]}>Ethyca Code Challenge</h1>
      </header>
      {id && (
        <div className={s["badge"]}>
          <span>
            <strong>Showing relationships for:</strong> {id}
          </span>
          <Link href="/" aria-label="Clear filter">
            <AiOutlineClose />
          </Link>
        </div>
      )}
    </div>
  );
}
