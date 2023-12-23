import { EditRoleForm } from 'modules/Role/presentation'
import React from 'react'
import { useParams } from 'react-router-dom'

const RoleEditPage = () => {
    const { id } = useParams()
    return (
        <EditRoleForm id={parseInt(id as string)} />
    )
}
export const Component = RoleEditPage