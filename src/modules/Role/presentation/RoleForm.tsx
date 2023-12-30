import { Grid } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { TextFormField } from 'shared';
import { object, string } from 'yup';

export const roleSchema = object({
    name: string().required(),
});

export const RoleForm = () => {
    const formCtx = useFormContext()
    if (!formCtx) {
        throw Error('No FormProvider.')
    }
    return (
        <Grid>
            <Grid.Col span={12}>
                <TextFormField name='name' label='Role' />
            </Grid.Col>
        </Grid>
    )
}
