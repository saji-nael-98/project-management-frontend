import { MRT_ColumnDef, MRT_RowSelectionState, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import { useSignOut } from 'react-auth-kit'
import { Link } from 'react-router-dom'
import { IRole } from '..'
import { useRolesQuery } from '../infrastructure'
import { ActionIcon, Box, Button, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
export const RoleList = () => {
    const signOut = useSignOut()
    const { data, error } = useRolesQuery()
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const columns = useMemo<MRT_ColumnDef<IRole>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                maxSize: 100,
                size: 50,
                Cell: ({ cell }) => (
                    <Text w={'100%'} display='block' component={Link} to={cell.getValue<number>().toLocaleString()}>
                        {cell.getValue<number>().toLocaleString()}
                    </Text>
                ),
            },
            {
                accessorKey: 'name',
                header: 'Role',
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        data: (data as unknown) as IRole[] ?? [],
        columns: columns,
        state: {
            density: 'xs',
            rowSelection
        },
        enableDensityToggle: false,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        positionToolbarAlertBanner: 'bottom',
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '16px', padding: '4px' }}>
                <ActionIcon
                    variant='filled'
                    color="red"
                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                    onClick={() => {
                        console.log(table.getState().rowSelection)
                        console.log(table.getSelectedRowModel().rows)
                    }}>
                    <IconTrash size="1rem" />
                </ActionIcon>
            </Box>
        ),
        mantineTableContainerProps: { sx: { minHeight: 'auto' } },
        mantineSelectCheckboxProps: { size: 'sm' },


    })
    return (
        <MantineReactTable table={table} />
    )
}
