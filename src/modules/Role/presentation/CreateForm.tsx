import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { apiClient } from 'utils'
import { RoleModelForm } from '.'

export const CreateRoleForm = () => {
    const { isSuccess, mutate } = useMutation({
        mutationKey: ['resource', 'create', 'role'],
        mutationFn: (data) => apiClient.post('/resource/roles', data)
    })
    const form = useForm({

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

