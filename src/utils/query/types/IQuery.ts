import { UseQueryOptions as QueryOptions } from "@tanstack/react-query"
import { RESOURCES, RESOURCES_TYPE, SUBRESOURCE } from "utils/constant"
interface UseQueryOptions extends Partial<QueryOptions> {

}

export interface IQuery {
    filters?: object
    options?: UseQueryOptions
}

interface UseGetResource {
    type: RESOURCES_TYPE
    resource: keyof typeof RESOURCES
    method?: string
}

interface UseGetSubResouce {
    subResource: keyof typeof SUBRESOURCE[keyof typeof SUBRESOURCE];
}

export interface UseGetResourceList extends UseGetResource {
    type: 'resource'
}

export interface UseGetSubResourceList extends UseGetResource, UseGetSubResouce {
    type: 'sub-resource'
}

export interface UseGetOneResource extends UseGetResource {
    type: 'resource'
    resourceId: any
}
export interface UseGetOneSubResource extends UseGetResource, UseGetSubResouce {
    type: 'sub-resource'
    resourceId: any
    subResourceId: any
}