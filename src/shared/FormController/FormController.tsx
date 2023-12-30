import { Text } from '@mantine/core';
import React from 'react'
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, UseFormStateReturn, useFormContext } from 'react-hook-form';
interface Props {
    name: string
    render: ({ field, fieldState, formState, }: {
        field: ControllerRenderProps<FieldValues, string>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<FieldValues>;
    }) => React.ReactElement<any>
}
export const FormController = ({ name, render }: Props) => {
    const formCtx = useFormContext()
    if (!formCtx) {
        throw Error('No FormProvider is provided.')
    }
    return (
        <>
            <Controller control={formCtx.control} name={name} render={render} />
        </>
    )
}

