import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AuthProvider } from 'react-auth-kit'
const queryClient = new QueryClient()
export const Providers = (props: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider authType={'localstorage'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "https:"}>
                {props.children}
            </AuthProvider>
        </QueryClientProvider>
    )
}
