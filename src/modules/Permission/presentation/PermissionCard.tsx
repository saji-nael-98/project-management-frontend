import { Button, Card, Checkbox, Group, Stack, Text } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSave } from 'utils/mutation/infrastructure'

interface Props {
    data: Permission
    refetchAuthorizedTables: () => void
}

export const PermissionCard: React.FC<Props> = ({ data, refetchAuthorizedTables }) => {
    const { mutateAsync, isPending } = useSave({
        type: 'sub-resource',
        mutationType: 'edit',
        resource: 'ROLES',
        subResource: 'PERMISSIONS',
        resourceId: data.role
    })
    const { control, handleSubmit, formState: { isDirty } } = useForm({
        values: {
            role: data.role,
            resource: data.resource,
            read: data.read,
            write: data.write,
            delete: data.delete
        }
    })
    const editHandler = async (values: any) => {
        await mutateAsync(values)
        refetchAuthorizedTables()
    }
    return (
        <Card withBorder shadow="sm" radius="sm">
            <Card.Section withBorder inheritPadding py="xs">
                <Text>{data.resource}</Text>
            </Card.Section>
            <Stack py={'xs'}>
                <Controller name='read' control={control} render={({ field: { value, ...field } }) => <Checkbox
                    label="Read"
                    size="xs"
                    checked={value}
                    {...field}
                />} />
                <Controller name='write' control={control} render={({ field: { value, ...field } }) => <Checkbox
                    label="Write"
                    size="xs"
                    checked={value}
                    {...field}
                />} />
                <Controller name='delete' control={control} render={({ field: { value, ...field } }) => <Checkbox
                    label="Delete"
                    size="xs"
                    checked={value}
                    {...field}
                />} />
            </Stack>
            <Card.Section withBorder inheritPadding py="xs">
                <Group position='right'>
                    <Button disabled={!isDirty} onClick={handleSubmit(editHandler)} size='sm' compact leftIcon={<IconEdit size={'1rem'} />}>
                        Edit
                    </Button>
                    <Button color='red' size='sm' compact leftIcon={<IconTrash size={'1rem'} />}>
                        Del.
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    )
}
