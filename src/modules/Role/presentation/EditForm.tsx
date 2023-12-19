import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { apiClient } from 'utils'
import { RoleModelForm } from '.'
import { useGetRole } from '../infrastructure/roleQuery'
interface Props {
    id: number
}
export const EditRoleForm = ({ id }: Props) => {
    const { isSuccess, mutate } = useMutation({
        mutationKey: ['resource', 'edit', 'role', id],
        mutationFn: (data) => apiClient.put('/resource/roles/' + id, data)
    })
    const { data } = useGetRole({ id })

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

