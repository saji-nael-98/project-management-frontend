import { UseQueryOptions as QueryOptions } from "@tanstack/react-query"
import { RESOURCES, SUBRESOURCE } from "utils/constant"
interface UseQueryOptions extends Partial<QueryOptions> {

}

type RESOURCES_TYPE = 'resource' | 'sub-resource'
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
    resourceId: any
}

export interface UseGetResourceList extends UseGetResource {
    type: 'resource'
}

export interface UseGetSubResourceList extends UseGetResource, UseGetSubResouce {
    type: 'sub-resource'
}

export interface UseGetOneResource extends UseGetResource {
    type: 'resource'
}
export interface UseGetOneSubResource extends UseGetResource, UseGetSubResouce {
    type: 'sub-resource'
    subResourceId: any
}