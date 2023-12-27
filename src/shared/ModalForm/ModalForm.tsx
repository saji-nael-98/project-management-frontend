import { Button, Group, Modal, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PropsWithChildren, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
interface Props {
    title: string
    handleValues: (data: any) => void
    isSuccess: boolean
}
export const ModalForm = ({ title, handleValues, isSuccess, children }: Props & PropsWithChildren) => {
    const form = useFormContext()
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const onCloseHandler = () => {
        navigate(-1);
        close()
    }

    useEffect(() => {
        open()
    }, [])

    useEffect(() => {
        isSuccess && onCloseHandler()
    }, [isSuccess])

    return (
        <Modal withinPortal opened={opened} onClose={onCloseHandler} title={title} scrollAreaComponent={ScrollArea.Autosize}
        >
            {children}
            <Group position='right' mt='md'>
                <Button size='sm' onClick={form.handleSubmit(handleValues)}>Save</Button>
            </Group>
        </Modal>
    )
}
