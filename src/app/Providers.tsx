import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { AuthProvider } from 'react-auth-kit'
import { queryClient } from 'utils/query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Providers = (props: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <AuthProvider authType={'cookie'}
                authName={'_auth'}
                cookieDomain={window.location.hostname}
                cookieSecure={window.location.protocol === "https:"}>
                <MantineProvider theme={{ primaryColor: 'teal', colorScheme: 'dark' }}>
                    <Notifications />
                    {props.children}
                </MantineProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
