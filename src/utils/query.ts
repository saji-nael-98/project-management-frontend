import { QueryClient, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { apiClient } from "./axios";

export const queryClient = new QueryClient()
// get list 
interface UseGetListProps {
    resource: string;
    filters?: {
        [key: string]: any
    }
    options?: UseQueryOptions
}
const defaultParams = {
    page: 0,
    limit: 5
}
export function useGetList({ resource, options, filters }: UseGetListProps) {
    return useQuery({
        queryKey: ['resource', resource, 'list'],
        queryFn: () => apiClient.get(`/resource/${resource}`, { params: { ...filters } }),
        ...options,
    })
}
export function resourceListLoader(resource: string) {
    return () => queryClient.fetchQuery({
        queryKey: ['resource', resource, 'list'],
        queryFn: () => apiClient.get(`/resource/${resource}`, {
            params: {
                ...defaultParams
            }
        })
    }) ?? []
}
