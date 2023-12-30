import { useNavigate } from 'react-router-dom'
import { EditRecordModal } from 'shared/CRUD'
import { useSave } from 'utils/mutation/infrastructure'
import { RoleForm } from '.'
import { useRoleForm } from '../infrastructure'
import { useGetRole } from '../infrastructure/roleQuery'
interface Props {
    id: number
}
export const EditRoleForm = ({ id }: Props) => {
    const navigate = useNavigate()
    const { mutate } = useSave({
        type: 'resource',
        mutationType: 'edit',
        resource: 'ROLES',
        resourceId: id,
        options: {
            onSuccess(_data, _variables, _context) {
                navigate(-1)
            },
        }
    })
    const { data, isFetched, isSuccess } = useGetRole({ id })

    const form = useRoleForm({ values: data ?? {} })

    function valuesHandler(data: any) {
        mutate(data)
    }
    return (
        <EditRecordModal open={isFetched || isSuccess} form={form} title="Role" valuesHandler={valuesHandler}>
            <RoleForm />
        </EditRecordModal>
    )
}

