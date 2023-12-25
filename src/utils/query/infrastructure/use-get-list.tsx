import { useQuery } from "@tanstack/react-query"
import { apiClient } from "utils/axios"
import { IQuery, UseGetResourceList, UseGetSubResourceList } from "../types"
import { RESOURCES, SUBRESOURCE } from "utils/constant"

export const useGetList = ({ options, filters, resource, method, ...props }: (UseGetResourceList | UseGetSubResourceList) & IQuery) => {
    if (!(resource in RESOURCES)) {
        throw Error("Invalid Resource: " + resource)
    }

    const queryKey:any[] = ['resource', resource, 'list']
 
    const url = ['/resource']
    url.push(resource.toLowerCase())

    let targetResource = resource as string

    if ('resourceId' in props) {
        const { resourceId, subResource } = props as UseGetSubResourceList
        const subResourceLowercase = subResource.toLowerCase()
        if (!SUBRESOURCE[resource.toLowerCase()] ||!(subResource in SUBRESOURCE[resource.toLowerCase()])) {
            throw Error("Invalid SubResource: " + subResourceLowercase)
        }

        targetResource = subResourceLowercase

        url.push(resourceId)

        if (method) {
            url.push(method)
        } else {
            url.push(subResourceLowercase)
        }
    } else {

        if (method) {
            url.push(method)
        }
    }

    if(method){
        queryKey.push(method)
    }

    if(filters && Object.keys(filters).length){
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