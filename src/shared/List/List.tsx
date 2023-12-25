import { Button, Group, Stack, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
interface ListProps {
  title: string
  createPath: string
}
export const List = ({ createPath, title, children }: ListProps & PropsWithChildren) => {
  return (
    <Stack spacing='md'>
      <Group position='apart'>
        <Text fz="lg" sx={(theme) => ({ color: theme.colorScheme == 'light' ? 'black' : 'white' })}>{title}</Text>
        <Button leftIcon={<IconPlus />} component={Link} to={createPath}>Create</Button>
      </Group>
      {children}
    </Stack>
  )
}

