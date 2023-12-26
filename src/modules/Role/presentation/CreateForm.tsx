import { FormProvider, useForm } from 'react-hook-form'
import { useSave } from 'utils/mutation/infrastructure'
import { RoleModelForm } from '.'

export const CreateRoleForm = () => {
    const { mutate, isSuccess } = useSave({
        type: 'resource',
        mutationType: 'create',
        resource: 'ROLES'
    })

    const form = useForm({

    })

    function handleValues(data: any) {
        console.log(3)
        mutate(data)
    }
    return (
        <FormProvider {...form}>
            <RoleModelForm isSuccess={isSuccess} handleValues={handleValues} />
        </FormProvider>
    )
}

