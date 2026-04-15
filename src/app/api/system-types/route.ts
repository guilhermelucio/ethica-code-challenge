import { readDB } from "@/db/utils/readDb";
import { APIListOutput, SystemTypes } from "@/types";

export async function GET() {
  const { system_types: systemTypes } = await readDB();
  const response: APIListOutput<SystemTypes> = {
    total: systemTypes.length,
    size: systemTypes.length,
    cursor: systemTypes.at(-1)?.id ?? "",
    data: systemTypes,
    hasNext: false,
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
