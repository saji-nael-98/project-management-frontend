import { Autocomplete, Group, Paper } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IRole } from 'modules/Role/types';
import { useMemo } from 'react';
import { NoData } from 'shared/NoData';
import { useGetList } from 'utils/query/infrastructure';

export const PermissionList = () => {
    const [role, setRole] = useInputState('')

    const { data: rolesData } = useGetList({
        type: 'resource',
        resource: 'ROLES',
    })

    const { data: authorizedTables } = useGetList({
        type: 'sub-resource',
        resource: 'ROLES',
        resourceId: role,
        subResource: 'PERMISSIONS',
        method: 'authorized-tables',
        options: {
            enabled: !!role
        }
    })

    const roles = useMemo(() => (rolesData as unknown as IRole[])?.map((role: any) => role.name) ?? [], [rolesData])

    return (
        <Paper mih={500} p={'md'} sx={(theme) => ({
            backgroundColor: theme.colorScheme == 'light' ? theme.colors.white : theme.colors.dark[6]
        })}>
            <Group>
                <Autocomplete
                    error={!role}
                    variant='filled'
                    label="Select Role"
                    placeholder="Pick one"
                    value={role}
                    onChange={setRole}
                    data={roles}
                />
            </Group>
            {!authorizedTables && < NoData />}
            {(authorizedTables as [])?.length == 0 && < NoData />}
        </Paper>
    )
}
