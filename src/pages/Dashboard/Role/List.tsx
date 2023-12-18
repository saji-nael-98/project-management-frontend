import { Button, Group, Text } from '@mantine/core'
import { RoleList } from 'modules/Role/presentation'
import React, { useEffect } from 'react'
import { useSignOut } from 'react-auth-kit'
import { Link } from 'react-router-dom'

export const RoleListPage = () => {
  const signOut = useSignOut()
  useEffect(() => {
    // signOut()
  }, [])
  return (
    <>
      <Group position='apart' my='md'>
        <Text fz="lg" fw={500}>Role</Text>
        <Button size='md' compact component={Link} to={'create'}>
          Create
        </Button>
      </Group>
      <RoleList />
    </>
  )
}

