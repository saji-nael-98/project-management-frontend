import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

interface Props {
    values?: any
}

const roleSchema = object({
    name: string().required(),
});

export const useRoleForm = ({ values }: Props = {}) => {
    return useForm({
        values,
        resolver: yupResolver(roleSchema)
    })
}
