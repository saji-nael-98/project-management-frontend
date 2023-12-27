import { FormProvider, useForm } from 'react-hook-form'
import { ModalForm } from 'shared/ModalForm'
import { useSave } from 'utils/mutation/infrastructure'
import { RoleForm } from '.'

export const CreateRoleForm = () => {
    const { mutate, isSuccess } = useSave({
        type: 'resource',
        mutationType: 'create',
        resource: 'ROLES'
    })

    const form = useForm({

    })

    function handleValues(data: any) {
        mutate(data)
    }
    return (
        <FormProvider {...form}>
            <ModalForm title='Role' handleValues={handleValues} isSuccess={isSuccess} >
                <RoleForm />
            </ModalForm>
        </FormProvider>
    )
}

