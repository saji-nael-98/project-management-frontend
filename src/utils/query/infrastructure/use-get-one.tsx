import { useQuery } from "@tanstack/react-query"
import { apiClient } from "utils/axios"
import { RESOURCES, SUBRESOURCE } from "utils/constant"
import { IQuery, UseGetOneResource, UseGetOneSubResource } from "../types"

export const useGetOne = ({ options, filters, resource, method, ...props }: (UseGetOneResource | UseGetOneSubResource) & IQuery) => {
    if (!(resource in RESOURCES)) {
        throw Error("Invalid Resource: " + resource)
    }

    const queryKey: any[] = ['resource', resource, 'list']

    const url = ['/resource']
    url.push(resource.toLowerCase())

    let targetResource = resource as string

    if (props.type == 'sub-resource') {
        const { resourceId, subResource, subResourceId } = props as UseGetOneSubResource
        const subResourceLowercase = subResource.toLowerCase()
        if (!SUBRESOURCE[resource.toLowerCase()] || !(subResource in SUBRESOURCE[resource.toLowerCase()])) {
            throw Error("Invalid SubResource: " + subResourceLowercase)
        }

        targetResource = subResourceLowercase

        url.push(resourceId)

        if (method) {
            url.push(method)
        } else {
            url.push(subResourceLowercase)
            url.push(subResourceId)
        }
    } else {

        if (method) {
            url.push(method)
        }
    }

    if (method) {
        queryKey.push(method)
    }

    if (filters && Object.keys(filters).length) {
        queryKey.push(filters)
    }
    return useQuery({
        queryKey,
        queryFn: ({ signal }) => apiClient.get(url.join("/"), {
            signal, params: {
                resource: targetResource.toLowerCase(),
                ...filters
            }
        }),
        ...options
    })
}