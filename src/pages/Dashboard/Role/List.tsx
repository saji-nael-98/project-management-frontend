import { Button, Group, SimpleGrid, Text, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { RoleList } from 'modules/Role/presentation'
import { Link } from 'react-router-dom'
import { RequireAuth } from 'shared'

const RoleListPage = () => {
  return (
    <RequireAuth>
      <Group position='apart'>
        <Text fz="lg" c='white'>Roles</Text>
        <Button leftIcon={<IconPlus />} component={Link} to='create'>Create</Button>
      </Group>
      <SimpleGrid cols={4} spacing="xs" my='md'>
        <div><TextInput size='sm' label='Role' placeholder='Role' /></div>
      </SimpleGrid>
      <RoleList />
    </RequireAuth>
  )
}

export const Component = RoleListPage