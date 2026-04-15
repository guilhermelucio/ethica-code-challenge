import { APIMutationOutput, DataMap } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMoveItemMutation({
  systemTypeId: columnId,
}: {
  systemTypeId: string;
}) {
  const client = useQueryClient();
  return useMutation({
    mutationKey: ["move-data-map", { columnId: columnId }],
    mutationFn: async ({ dataMapId: cardId }: { dataMapId: string }) => {
      const response = await fetch(`/api/data-map/${cardId}`, {
        method: "PATCH",
        body: JSON.stringify({
          systemTypeId: columnId,
        }),
      });

      const data = (await response.json()) as APIMutationOutput<DataMap>;
      return data;
    },
    onSuccess: (data) => {
      client.invalidateQueries({
        queryKey: ["columns", { systemTypeId: data.prevItem?.system_type }],
      });

      client.invalidateQueries({
        queryKey: ["columns", { systemTypeId: data.currItem?.system_type }],
      });
    },
  });
}
