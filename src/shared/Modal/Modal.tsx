import { Button, Group, Modal as MantineModal, ScrollArea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PropsWithChildren, forwardRef, useImperativeHandle } from 'react'

interface Props extends PropsWithChildren {
    title?: string
    primaryAction?: () => void
    primaryActionLabel?: string
    disablePrimaryAction?: boolean
    onClose?: (f: () => void) => void
}

export interface ModalRef {
    open: () => void
}

export const Modal = forwardRef<ModalRef, Props>(({ disablePrimaryAction = false, primaryAction = () => { }, primaryActionLabel = 'save', title, children, onClose }, ref) => {
    const [opened, { open, close }] = useDisclosure(false);

    useImperativeHandle(ref, () => ({
        open
    }))
    function closeHandler() {
        if (onClose) {
            onClose(close)
        } else {
            close()
        }
    }
    return (
        <MantineModal
            closeOnClickOutside={false}
            title={title}
            opened={opened}
            onClose={closeHandler}
            scrollAreaComponent={ScrollArea.Autosize}
            withinPortal
        >
            {children}
            <Group position='right' mt='md'>
                <Button disabled={disablePrimaryAction} size='sm' onClick={primaryAction}>{primaryActionLabel}</Button>
            </Group>
        </MantineModal>
    )
})
