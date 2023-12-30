import { ActionIcon, Box, Text } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { MRT_ColumnDef, MRT_RowSelectionState, MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageRequest } from 'types/PageRequest'
import { formatFilters } from 'utils/filters'
import { useGetList } from 'utils/query/infrastructure'
import { IRole } from '../types'
import { useDelete } from 'utils/mutation/infrastructure'
export const RoleList = () => {
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [formatedColumnFilters, setFormatedColumnFilters] = useState({});
    const { mutateAsync } = useDelete({
        type: 'resource',
        resource: 'ROLES'
    })
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5
    });
    const { data, isLoading, isFetching, refetch } = useGetList({
        type: 'resource',
        resource: 'ROLES',
        filters: {
            page: pagination.pageIndex,
            limit: pagination.pageSize
        }
    })
    // const { data, isLoading, isFetching } = usePaginatedList({
    //     resource: RESOURCES.ROLES, filters: {
    //         page: pagination.pageIndex,
    //         limit: pagination.pageSize
    //     }
    // })
    const columns = useMemo<MRT_ColumnDef<IRole>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 40,
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


    const response = (data as unknown) as PageRequest
    const table = useMantineReactTable({
        data: response?.data as [] ?? [],
        columns: columns,
        state: {
            density: 'xs',
            rowSelection,
            pagination,
            columnFilters,
            isLoading: isLoading || isFetching

        },
        defaultColumn: { minSize: 40, maxSize: 150 },
        enableColumnResizing: true,
        enableDensityToggle: false,
        enableGlobalFilter: false,
        enableFullScreenToggle: false,
        positionToolbarAlertBanner: 'bottom',
        onRowSelectionChange: setRowSelection,
        manualFiltering: true, //turn off client-side filtering
        enableFilters: false,
        // onColumnFiltersChange: setColumnFilters, //hoist internal columnFilters state to your state
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '16px', padding: '4px' }}>
                <ActionIcon
                    variant='filled'
                    color="red"
                    disabled={!table.getIsAllRowsSelected() && !table.getIsSomeRowsSelected()}
                    onClick={async () => {
                        const selected = Object.keys(rowSelection)?.filter(r => rowSelection[r])
                        const ids = selected.map(i => ((response.data as [])[parseInt(i)]).id)
                        await mutateAsync(ids)
                        refetch()
                    }}
                >
                    <IconTrash size="1rem" />
                </ActionIcon>
            </Box>
        ),
        mantineTableContainerProps: { sx: { minHeight: 'auto' } },
        onPaginationChange: setPagination,
        manualPagination: true,
        rowCount: response?.totalRecords ?? 0, //you can tell the pagination how many rows there are in your back-end data
        mantineTableBodyRowProps: ({ row }) => ({
            //implement row selection click events manually
            onClick: () =>
                setRowSelection((prev) => ({
                    ...prev,
                    [row.id]: !prev[row.id],
                })),
            selected: rowSelection[row.id],
            sx: {
                cursor: 'pointer',
            },
        }),

    })
    useEffect(() => {
        if (columnFilters.length) {
            console.log(columnFilters)
            setFormatedColumnFilters(formatFilters(columnFilters))
            const t = setTimeout(() => {
                // refetch()
            }, 500)
            return () => {
                clearTimeout(t)
            }
        }
    }, [columnFilters])
    return (
        <>
            <MantineReactTable table={table} />
        </>
    )
}
