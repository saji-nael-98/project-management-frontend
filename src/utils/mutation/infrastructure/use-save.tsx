import { useMutation } from "@tanstack/react-query"
import { IMutation, UseEditResource, UseEditSubResource, UseSaveResource, UseSaveSubResource } from "../types"
import { RESOURCES, SUBRESOURCE } from "utils/constant"
import { apiClient } from "utils/axios"

export const useSave = ({ options, resource, type, method, mutationType, ...props }: (UseSaveResource | UseSaveSubResource | UseEditSubResource | UseEditResource) & IMutation) => {
    if (!(resource in RESOURCES)) {
        throw Error("Invalid Resource: " + resource)
    }

    const mutationKey: any[] = ['resource', mutationType, resource]

    const url = ['/resource']
    url.push(resource.toLowerCase())

    let targetResource = resource as string

    if (type == 'sub-resource') {
        const { resourceId, subResource } = props as UseSaveSubResource
        const subResourceLowercase = subResource.toLowerCase()
        if (!SUBRESOURCE[resource.toLowerCase()] || !(subResource in SUBRESOURCE[resource.toLowerCase()])) {
            throw Error("Invalid SubResource: " + subResourceLowercase)
        }

        targetResource = subResourceLowercase

        url.push(resourceId)
        mutationKey.push(resourceId)

        if (method) {
            mutationKey.push(method)
            url.push(method)
        } else {
            mutationKey.push(subResourceLowercase)
            url.push(subResourceLowercase)
        }
    } else {
        if (mutationType == 'edit') {
            const { resourceId } = props as UseEditResource
            mutationKey.push(resourceId)
            url.push(resourceId)
        }
        if (method) {
            mutationKey.push(method)
            url.push(method)
        }
    }

    if (method) {
        mutationKey.push(method)
    }
    return useMutation({
        mutationKey,
        mutationFn: (data) => {
            if (mutationType == 'create') {
                return apiClient.post(url.join("/"), data, {
                    params: {
                        resource: targetResource
                    }
                })
            } else {
                return apiClient.put(url.join("/"), data, {
                    params: {
                        resource: targetResource
                    }
                })
            }
        }
    })
}