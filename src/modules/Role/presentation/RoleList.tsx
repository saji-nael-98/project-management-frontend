import { ActionIcon, Box, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { MRT_ColumnDef, MRT_RowSelectionState, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageRequest } from 'types/PageRequest'
import { formatFilters } from 'utils/filters'
import { useRolesQuery } from '../infrastructure'
import { IRole } from '../types'
export const RoleList = () => {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [formatedColumnFilters, setFormatedColumnFilters] = useState({});

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    });
    const { data, refetch } = useRolesQuery({
        filters: {
            page: pagination.pageIndex,
            limit: pagination.pageSize,
            ...formatedColumnFilters
        }
    })

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
    useEffect(() => {
        if (columnFilters.length) {
            console.log(columnFilters)
            setFormatedColumnFilters(formatFilters(columnFilters))
            const t = setTimeout(() => {
                refetch()
            }, 500)
            return () => {
                clearTimeout(t)
            }
        }
    }, [columnFilters])

    const response = (data as PageRequest)
    const table = useMantineReactTable({
        data: response.data as IRole[] ?? [],
        columns: columns,
        state: {
            density: 'xs',
            rowSelection,
            pagination,
            columnFilters
        },
        enableDensityToggle: false,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        positionToolbarAlertBanner: 'bottom',
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        manualFiltering: true, //turn off client-side filtering

        onColumnFiltersChange: setColumnFilters, //hoist internal columnFilters state to your state
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '16px', padding: '4px' }}>
                <ActionIcon
                    variant='filled'
                    color="red"
                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                >
                    <IconTrash size="1rem" />
                </ActionIcon>
            </Box>
        ),
        mantineTableContainerProps: { sx: { minHeight: 'auto' } },
        mantineSelectCheckboxProps: { size: 'sm' },
        onPaginationChange: setPagination,
        rowCount: response.totalRecords, //you can tell the pagination how many rows there are in your back-end data

    })
    return (
        <>
            <MantineReactTable table={table} />
        </>
    )
}
