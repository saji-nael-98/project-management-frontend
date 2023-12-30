import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Modal, ModalRef } from 'shared/Modal'
interface Props extends PropsWithChildren {
    form: any
    title: string
    valuesHandler: (data: any) => void
}
export const CreateRecordModal = ({ form, valuesHandler, children, title }: Props) => {
    const modalRef = useRef<ModalRef>(null)
    const navigate = useNavigate()
    useEffect(() => {
        modalRef.current?.open()
    }, [])
    return (
        <FormProvider {...form}>
            <Modal
                ref={modalRef}
                title={title}
                primaryAction={form.handleSubmit(valuesHandler)}
                disablePrimaryAction={!form.formState.isDirty}
                onClose={(_close) => {
                    navigate(-1)
                }}>
                {children}
            </Modal>
        </FormProvider>
    )
}
