import { apiClient, useGetList } from "utils"
export function getRolesQuery() {
    return {
        queryKey: ['resource', 'role'],
        queryFn: () => apiClient.get('/resource/roles')
    }

}
export const useRolesQuery = ({ filters }: { filters?: { [key: string]: any } } = {}) => {
    return useGetList({
        resource: 'role', filters,
        options: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
            refetchInterval: 0   
        }
    })
}

