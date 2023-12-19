import { useGetOne } from "utils"

export const useGetRole = ({ id }: { id: number }) => {
    return useGetOne({
        id, resource: 'role'
    })
}