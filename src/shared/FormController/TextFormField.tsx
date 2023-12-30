import React from 'react'
import { FormController } from '.'
import { TextInput } from '@mantine/core'
interface Props {
    label: string
    name: string
}
export const TextFormField = ({ label, name }: Props) => {
    return (
        <FormController name={name} render={({ field, fieldState }) => <TextInput size='sm' label={label} {...field} error={!!fieldState.error?.message} />} />
    )
}
