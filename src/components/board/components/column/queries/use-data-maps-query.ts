import { APIListOutput, DataMaps } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useDataMapsQuery({
  systemTypeId,
  filterId,
}: {
  systemTypeId: string;
  filterId: string | null;
}) {
  return useQuery({
    queryKey: ["columns", { systemTypeId, filterId }],
    queryFn: async () => {
      const response = await fetch(
        `/api/system-types/${systemTypeId}${filterId ? `?filterId=${filterId}` : ""}`,
      );
      const { data } = (await response.json()) as APIListOutput<DataMaps>;
      return data;
    },
  });
}
