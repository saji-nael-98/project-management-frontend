import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CreateRecordModal } from "shared/CRUD"
import { useSave } from 'utils/mutation/infrastructure'
import { RoleForm, roleSchema } from '.'
import { useRoleForm } from "../infrastructure"

export const CreateRoleForm = () => {
    const form = useRoleForm()
    const navigate = useNavigate()
    const { mutate } = useSave({
        type: 'resource',
        mutationType: 'create',
        resource: 'ROLES',
        options: {
            onSuccess(_data, _variables, _context) {
                navigate(-1)
            },
        }
    })
    function valuesHandler(data: any) {
        mutate(data)
    }
    return (
        <CreateRecordModal form={form} title="Role" valuesHandler={valuesHandler}>
            <RoleForm />
        </CreateRecordModal>
    )


}
