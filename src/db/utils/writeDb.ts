import { promises as fs } from "fs";
import { DB_PATH } from "./shared";

export async function writeDb(content: string) {
  await fs.writeFile(DB_PATH, content, "utf-8");
}
