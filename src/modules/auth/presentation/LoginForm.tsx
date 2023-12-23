import { Button, Stack } from '@mantine/core'
import { useMutation } from '@tanstack/react-query'
import { JwtPayload, jwtDecode } from 'jwt-decode'
import { useSignIn } from 'react-auth-kit'
import { useForm } from 'react-hook-form'
import { apiClient } from 'utils/axios'
export const LoginForm = () => {
    const signIn = useSignIn()
    const { handleSubmit } = useForm({
        defaultValues: {
            username: 'admin',
            password: 'dummy123'
        }
    })
    const { mutate } = useMutation({
        mutationKey: ['user', 'sign-in'],
        mutationFn: (data) => apiClient.post('/auth/signIn', data),
        onSuccess(data, _variables, _context) {
            const token = data
            const decoded: JwtPayload & { userInfo: object } = jwtDecode((token as unknown) as string)
            signIn({
                token: token, expiresIn: decoded.exp as number, tokenType: 'Bearer', authState: {
                    userInfo: decoded.userInfo
                }
            })
        },
    })
    function signInHandler(data: any) {
        mutate(data)
    }
    return (
        <Stack>
            <Button tt='capitalize' onClick={handleSubmit(signInHandler)}>sign in</Button>
        </Stack>
    )
}
