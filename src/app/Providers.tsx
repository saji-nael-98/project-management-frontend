import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AuthProvider } from 'react-auth-kit'
import { queryClient } from 'utils'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Providers = (props: PropsWithChildren) => {
    return (
        <MantineProvider theme={{ primaryColor: 'teal' }}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools client={queryClient} initialIsOpen={false}/>
                <AuthProvider authType={'cookie'}
                    authName={'_auth'}
                    cookieDomain={window.location.hostname}
                    cookieSecure={window.location.protocol === "https:"}>
                    {props.children}
                </AuthProvider>
            </QueryClientProvider>
        </MantineProvider>
    )
}
