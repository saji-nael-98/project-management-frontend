import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RoleModelForm } from '.'
import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from 'utils'
interface Props {
    id: number
}
export const EditRoleForm = ({ id }: Props) => {
    const { isSuccess, mutate } = useMutation({
        mutationKey: ['resource', 'edit', 'role', id],
        mutationFn: (data) => apiClient.put('/resource/roles/' + id, data)
    })
    const { data } = useQuery({
        queryKey: ['resource', 'read', 'role', id],
        queryFn: ({ signal }) => apiClient.get('/resource/roles/' + id, { signal })
    })
    const form = useForm({
        values: data ?? {}
    })

    function handleValues(data: any) {
        mutate(data)
    }
    return (
        <FormProvider {...form}>
            <RoleModelForm isSuccess={isSuccess} handleValues={handleValues} />
        </FormProvider>
    )
}

