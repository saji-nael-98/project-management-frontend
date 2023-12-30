import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalRef } from 'shared/Modal'
interface Props extends PropsWithChildren {
    open: boolean;
    form: any
    title: string
    valuesHandler: (data: any) => void
}
export const EditRecordModal = ({ form, valuesHandler, children, title, open }: Props) => {
    const modalRef = useRef<ModalRef>(null)
    const navigate = useNavigate()
    useEffect(() => {
        open && modalRef.current?.open()
    }, [open])
    return (
        <FormProvider {...form}>
            <Modal
                ref={modalRef}
                title={title}
                primaryAction={form.handleSubmit(valuesHandler)}
                primaryActionLabel='Update'
                disablePrimaryAction={!form.formState.isDirty}
                onClose={(_close) => {
                    navigate(-1)
                }}>
                {children}
            </Modal>
        </FormProvider>
    )
}
