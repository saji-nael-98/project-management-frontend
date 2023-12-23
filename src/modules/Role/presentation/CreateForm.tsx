import { FormProvider, useForm } from 'react-hook-form'
import { useSaveOne } from 'utils/query'
import { ROLES_RESOURCE } from 'utils/constant'
import { RoleModelForm } from '.'

export const CreateRoleForm = () => {
    const { isSuccess, mutate } = useSaveOne(ROLES_RESOURCE)
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

