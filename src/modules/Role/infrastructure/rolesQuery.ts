import { keepPreviousData } from '@tanstack/react-query';
import { useGetList } from "utils"
import { ROLES_RESOURCE } from "utils/constant"

export const useRolesQuery = ({ filters }: { filters?: { [key: string]: any } } = {}) => {
    return useGetList({
        resource: ROLES_RESOURCE, filters, options: {
            placeholderData: keepPreviousData
        }
    })
}

