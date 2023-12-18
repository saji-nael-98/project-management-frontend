import { Button, Group, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { RoleForm } from '.'
interface Props {
    handleValues: (data: any) => void
    isSuccess: boolean
}
export const RoleModelForm = ({ handleValues, isSuccess }: Props) => {
    const form = useFormContext()
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const onCloseHandler = () => {
        navigate('/roles', { replace: true });
        close()
    }
    
    useEffect(() => {
        open()
    }, [])

    useEffect(() => {
        isSuccess && onCloseHandler()
    }, [isSuccess])

    return (
        <Modal opened={opened} onClose={onCloseHandler} title='Role'>
            <RoleForm />
            <Group position='right' mt='md'>
                <Button size='sm' onClick={form.handleSubmit(handleValues)}>Save</Button>
            </Group>
        </Modal>
    )
}
