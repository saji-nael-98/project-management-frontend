import { useGetOne } from "utils/query"
import { ROLES_RESOURCE } from "utils/constant"

export const useGetRole = ({ id }: { id: number }) => {
    return useGetOne({
        id, resource: ROLES_RESOURCE
    })
}