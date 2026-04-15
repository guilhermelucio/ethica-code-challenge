import { promises as fs } from "fs";
import { DB_PATH } from "./shared";
import { DBData } from "@/types";

export async function readDB(): Promise<DBData> {
  const response = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(response) as DBData;
}
