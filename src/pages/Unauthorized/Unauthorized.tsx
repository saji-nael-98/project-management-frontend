import { Button, Flex, Title, useMantineTheme } from '@mantine/core'
import React from 'react'
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export const Unauthorized = () => {
    const theme = useMantineTheme()
    const signOut = useSignOut()
    const navigate = useNavigate()
    function goToSignInHandler() {
        signOut()
        navigate('/login', {
            replace: true
        })

    }
    return (
        <Flex bg='dark' justify='center' align='center' h={'100vh'} direction='column'>
            <Title c={theme.primaryColor} order={1} fz={100} weight={700}>401</Title>
            <Title order={2} weight={700} c="dimmed">Unauthorized</Title>
            <Button w={150} tt='capitalize' mt={25} onClick={goToSignInHandler}>sign in</Button>
        </Flex>
    )
}
