import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";
export const useUserQueryData = (queryKey: QueryKey, queryFn: QueryFunction, enabled?: Enabled) => {
    const { data, isPending, isFetched, refetch, isFetching } = useQuery({
        queryKey: queryKey, queryFn: queryFn, enabled: enabled
    });
    return { data, isPending, isFetched, refetch, isFetching };
};