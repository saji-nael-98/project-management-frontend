export interface PermissionDto {
    role: string
    resource: string
    read: boolean
    write: boolean
    delete: boolean
}