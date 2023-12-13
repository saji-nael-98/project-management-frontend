import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useEffect } from 'react'
import { RequireAuth as ReactRequireAuth, useSignOut } from 'react-auth-kit'
import { apiClient } from 'utils'
export const RequireAuth = ({ children }: PropsWithChildren) => {
    // const signOut = useSignOut()
    // const { data, error, isError } = useQuery({
    //     queryKey: ['token', 'validation'],
    //     queryFn: () => apiClient.get('/auth/tokenValidation'),
    // })
    // useEffect(() => {
    //     if (error && error.response.status === 401) {
    //         signOut()
    //     }
    // }, [error, isError])
    return (
        <ReactRequireAuth loginPath='/login'>
            <>{children}</>
        </ReactRequireAuth>
    )
}
