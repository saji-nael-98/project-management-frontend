import React, { PropsWithChildren } from "react";
import { IRole } from "../../modules/Role/types";
import { FormProvider, useForm } from "react-hook-form";

interface Props extends PropsWithChildren {
    data?: IRole;
}

export const Form: React.FC<Props> = ({ data, children }) => {
    const form = useForm({
        defaultValues: data
    })
    return (
        <FormProvider {...form}>
            {children}
        </FormProvider>
    )
}