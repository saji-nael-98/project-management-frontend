import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { apiClient } from "utils"
export function getRolesQuery() {
    return {
        queryKey: ['resource', 'role'],
        queryFn: () => apiClient.get('/resource/roles')
    }

}
export const useRolesQuery = () => {
    return useQuery({
        ...getRolesQuery()
    })
}

