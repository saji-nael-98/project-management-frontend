import { UseMutationOptions } from '@tanstack/react-query'
import { RESOURCES, RESOURCES_TYPE, SUBRESOURCE } from 'utils/constant'
type MutationType = 'create' | 'edit'

export interface IMutation {
    mutationType: MutationType
    options?: Partial<UseMutationOptions>
}


interface SaveResource {
    mutationType: MutationType
    type: RESOURCES_TYPE
    resource: keyof typeof RESOURCES
    method?: string
}
interface SaveSubResouce {
    resourceId: any
    subResource: keyof typeof SUBRESOURCE[keyof typeof SUBRESOURCE];
}

export interface UseSaveResource extends SaveResource {
    type: 'resource'
    mutationType: 'create'
}

export interface UseSaveSubResource extends SaveResource, SaveSubResouce {
    mutationType: 'create'
    type: 'sub-resource'
}

export interface UseEditResource extends SaveResource {
    type: 'resource'
    mutationType: 'edit'
    resourceId: any
}

export interface UseEditSubResource extends SaveResource, SaveSubResouce {
    mutationType: 'edit'
    type: 'sub-resource'
    resourceId: any
}

