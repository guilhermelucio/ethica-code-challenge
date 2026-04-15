import { APIListOutput, SystemTypes } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useSystemTypesQuery() {
  return useQuery({
    queryKey: ["system-types"],
    queryFn: async () => {
      const response = await fetch(`/api/system-types`);
      const { data } = (await response.json()) as APIListOutput<SystemTypes>;
      return data;
    },
    staleTime: 60000,
  });
}
