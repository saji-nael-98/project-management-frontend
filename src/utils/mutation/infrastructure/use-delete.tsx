import { useMutation } from "@tanstack/react-query"
import { UseDeleteResource } from "../types/IDelete"
import { apiClient } from "utils/axios"

export const useDelete = ({ type, resource }: (UseDeleteResource)) => {
    const mutationKey = ['resource', 'delete']
    const uri = ['/resource', resource.toLowerCase()]
    let targetResource = type == 'resource' ? resource : null;
    if (type == 'resource') {
        mutationKey.push(resource)
    }
    return useMutation({
        mutationKey,
        mutationFn: (data: any) => {
            const params = {
                resource: targetResource
            }
            if (Array.isArray(data)) {
                return apiClient.delete(uri.join("/"), {
                    params,
                    data
                })
            } else {
                uri.push(data)
                return apiClient.delete(uri.join("/"), { params })
            }
        }

    })
}
