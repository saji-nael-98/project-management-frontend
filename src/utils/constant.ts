export type RESOURCES_TYPE = 'resource' | 'sub-resource'

export const ROLES_RESOURCE = 'roles'

export const RESOURCES = {
    ROLES: 'roles',
}
export const SUBRESOURCE = {
    [RESOURCES.ROLES]: {
        PERMISSIONS: 'permissions'
    }
}
