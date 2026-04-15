import { readDB } from "@/db/utils/readDb";
import { writeDb } from "@/db/utils/writeDb";
import { APIMutationOutput, DataMap, DBData } from "@/types";

type PatchInputCtx = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: PatchInputCtx) {
  const { systemTypeId } = (await request.json()) as { systemTypeId: string };
  const { id: dataMapId } = await params;
  let prevItem: DataMap | null = null;
  let currItem: DataMap | null = null;

  const { data_maps: dataMaps, system_types } = (await readDB()) as DBData;
  await writeDb(
    JSON.stringify({
      system_types,
      data_maps: dataMaps.map((item) => {
        if (item.fides_key === dataMapId) {
          prevItem = item;
          currItem = {
            ...item,
            system_type: systemTypeId,
          };

          return currItem;
        }
        return item;
      }),
    }),
  );

  const response: APIMutationOutput<DataMap> = { prevItem, currItem };
  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
