import { useGetOne } from "utils/query/infrastructure"

export const useGetRole = ({ id }: { id: number }) => {
    return useGetOne({
        type: 'resource',
        resource: 'ROLES',
        resourceId: id
    })
}