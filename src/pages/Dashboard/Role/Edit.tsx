import { EditRoleForm } from 'modules/Role/presentation'
import React from 'react'
import { useParams } from 'react-router-dom'

export const RoleEditPage = () => {
    const { id } = useParams()
    return (
        <EditRoleForm id={parseInt(id as string)} />
    )
}
