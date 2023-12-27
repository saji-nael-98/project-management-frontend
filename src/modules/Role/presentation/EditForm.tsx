import { FormProvider, useForm } from 'react-hook-form'
import { ModalForm } from 'shared/ModalForm'
import { useSave } from 'utils/mutation/infrastructure'
import { RoleForm } from '.'
import { useGetRole } from '../infrastructure/roleQuery'
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
            <ModalForm title='Role' isSuccess={isSuccess} handleValues={handleValues} >
                <RoleForm />
            </ModalForm>
        </FormProvider>
    )
}

