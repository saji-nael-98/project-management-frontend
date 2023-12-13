import { Flex } from '@mantine/core'
import { LoginForm } from 'modules/auth'
import { useEffect } from 'react'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const navigate = useNavigate()
    const isUserSignedIn = useIsAuthenticated()
    useEffect(() => {
        if (isUserSignedIn()) {
            navigate('/', {
                replace: true
            })
        }
    }, [isUserSignedIn()])
    return (
        <Flex h='100vh' bg='dark.6' justify='center' align='center'>
            <LoginForm />
        </Flex>
    )
}
