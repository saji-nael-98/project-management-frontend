import { useMutation } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'
import { apiClient } from 'utils/axios'
import { RoleModelForm } from '.'
import { useGetRole } from '../infrastructure/roleQuery'
import { useSave } from 'utils/mutation/infrastructure'
interface Props {
    id: number
}
export const EditRoleForm = ({ id }: Props) => {
    const { mutate, isSuccess } = useSave({
        type: 'resource',
        mutationType: 'edit',
        resource: 'ROLES',
        resourceId: id,
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

