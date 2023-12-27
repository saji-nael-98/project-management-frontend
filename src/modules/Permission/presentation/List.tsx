import { Autocomplete, SimpleGrid } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IRole } from 'modules/Role/types';
import { useMemo } from 'react';
import { useGetList } from 'utils/query/infrastructure';
import { PermissionCard } from './PermissionCard';
import { NoData } from 'shared/NoData';
import { PermissionDto } from '../types';

export const PermissionList = () => {
    const [role, setRole] = useInputState('')

    const { data: rolesData } = useGetList({
        type: 'resource',
        resource: 'ROLES',
    })

    const { data: authorizedTables, refetch } = useGetList({
        type: 'sub-resource',
        resource: 'ROLES',
        resourceId: role,
        subResource: 'PERMISSIONS',
        method: 'authorized-tables',
        options: {
            enabled: !!role,
            refetchOnWindowFocus: false,
        }
    })
    const refetchAuthorizedTables = ()=>{
        refetch()
    }
    const roles = useMemo(() => (rolesData as unknown as IRole[])?.map((role: any) => role.name) ?? [], [rolesData])

    return (
        <>
            <SimpleGrid cols={4} spacing="xs" verticalSpacing="xs" my='md'>
                <div><Autocomplete
                    error={!role}
                    label="Select Role"
                    placeholder="Pick one"
                    value={role}
                    onChange={setRole}
                    data={roles}
                /></div>
            </SimpleGrid>
            {((!role || (authorizedTables && (authorizedTables as []).length == 0)) || (!role || !authorizedTables)) && <NoData />}
            {(role && authorizedTables && (authorizedTables as []).length > 0) && <SimpleGrid cols={4} spacing="xs">
                {(authorizedTables as PermissionDto[]).map(p => <div key={p.resource}>
                    <PermissionCard refetchAuthorizedTables={refetchAuthorizedTables} data={p} />
                </div>)}
            </SimpleGrid>}
        </>
    )
}
