import { readDB } from "@/db/utils/readDb";
import { APIListOutput, DataMaps } from "@/types";
import { NextRequest } from "next/server";

type RequestParams = {
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RequestParams> },
) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const filterId = searchParams.get("filterId") ?? "";

  const { data_maps } = await readDB();

  const filteredList = data_maps
    .filter((dataMap) => {
      return dataMap.system_type === id;
    })
    .filter((item) => {
      if (!filterId) return true;
      return (
        item.fides_key === filterId ||
        item.system_dependencies.includes(filterId)
      );
    });

  const response: APIListOutput<DataMaps> = {
    total: filteredList.length,
    size: filteredList.length,
    cursor: filteredList.at(-1)?.fides_key ?? "",
    hasNext: false,
    data: filteredList,
  };

  return new Response(JSON.stringify(response), { status: 200 });
}
