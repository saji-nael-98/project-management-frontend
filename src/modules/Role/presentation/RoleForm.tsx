import { Grid, TextInput } from '@mantine/core'
import { FormController } from 'shared'

export const RoleForm = () => {
    return (
        <Grid>
            <Grid.Col span={12}>
                <FormController name='name' render={({ field }) => <TextInput size='sm' label='Role' {...field} />} />
            </Grid.Col>
        </Grid>
    )
}
