import { QueryClient, UseQueryOptions, useMutation, useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { apiClient } from "./axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export const queryClient = new QueryClient({})
// useGet
interface UseGetProps {
    resource: string;
    filters?: {
        [key: string]: any
    }
    options?: UseQueryOptions
}
// useGetOne
interface UseGetOneProps extends UseGetProps {
    id: any
}

export function useGetOne({ id, resource, filters, options }: UseGetOneProps) {
    return useOptimizedUseQuery({
        queryKey: ['resource', resource, 'read', id.toString()],
        queryFn: ({ signal }) => apiClient.get(`/resource/${resource}/${id}`, { signal, params: { resource, ...filters } }),
        ...options,
    })
}

export function resourceOneLoader(resource: string) {
    return ({ params }: LoaderFunctionArgs<any>) => queryClient.getQueryData(['resource', resource, 'read', params.id]) ?? queryClient.fetchQuery({
        queryKey: ['resource', resource, 'read', params.id],
        queryFn: ({ signal }) => apiClient.get(`/resource/${resource}/${params.id}`, {
            signal,
            params: {
                resource
            }
        }),
    })
}
// useGetList
const defaultParams = {
    page: 0,
    limit: 2
}
export function useGetList({ resource, options, filters }: UseGetProps) {
    return useOptimizedUseQuery({
        queryKey: ['resource', resource, 'list'],
        queryFn: ({ signal }) => apiClient.get(`/resource/${resource}`, { signal, params: { resource, ...filters } }),
        ...options,
    })
}

export function resourceListLoader(resource: string) {
    return ({ params }: LoaderFunctionArgs<any>) => queryClient.getQueryData(['resource', resource, 'list']) ?? queryClient.fetchQuery({
        queryKey: ['resource', resource, 'list'],
        queryFn: ({ signal }) => apiClient.get(`/resource/${resource}`, {
            signal,
            params: {
                resource,
                ...defaultParams
            }
        }),
    })
}


//
export const useOptimizedUseQuery = (options: UseQueryOptions) => {
    return useQuery({
        refetchOnWindowFocus: false,
        staleTime: 10000, // If the data is not available in the cache or if it is older than 10 seconds, React Query will automatically fetch the data again from the server.
        ...options
    })
}

//save
export const useSaveOne = (resource: string) => {
    return useMutation({
        mutationKey: ['resource', resource, 'create'],
        mutationFn: (data) => apiClient.post(`/resource/${resource}`, data, {
            params: {
                resource
            }
        }),
        onSuccess(_data, _variables, _context) {
            notifications.show({
                title: 'Record Creation',
                message: 'success',
            })
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['resource', resource] })
        },
    })
}


//usePaginatedList 
interface UsePaginatedListProps {
    resource: string;
    filters: {
        page: number;
        limit: number;
        [key: string]: any
    }
}
export const usePaginatedList = ({ resource, filters }: UsePaginatedListProps) => {
    return useQuery({
        queryKey: ['resource', resource, 'list', filters],
        queryFn: ({ signal }) => apiClient.get('/resource/roles', {
            signal,
            params: {
                resource,
                ...filters
            }
        }),
    })
}