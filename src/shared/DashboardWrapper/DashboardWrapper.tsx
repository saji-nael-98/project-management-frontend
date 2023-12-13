import { ActionIcon, AppShell, ColorScheme, Group, Header, MantineProvider, Navbar, Text, useMantineTheme } from '@mantine/core'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import NavLinks from './NavLinks'
import { IconMoon, IconSun } from '@tabler/icons-react'
interface DashboardHeaderProps {
    toggleColorScheme: (value?: ColorScheme) => void
}
const DashboardHeader = ({ toggleColorScheme }: DashboardHeaderProps) => {
    const theme = useMantineTheme()
    return <Header height={60} p="xs">
        <Group position='apart'>
            <Group>

            </Group>
            <Group>
                {theme.colorScheme === 'dark' &&
                    <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
                        <IconSun size="1.125rem" />
                    </ActionIcon>}
                {theme.colorScheme === 'light' &&
                    <ActionIcon variant="outline" onClick={() => toggleColorScheme()}>
                        <IconMoon size="1.125rem" />
                    </ActionIcon>}
            </Group>
        </Group>
    </Header>
}
export const DashboardWrapper = (props: PropsWithChildren) => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>(localStorage.getItem('dark') as ColorScheme ?? 'dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
        
    useEffect(() => {
        console.log(colorScheme)
        localStorage.setItem('colorScheme', colorScheme)
    }, [colorScheme])

    return (
        <MantineProvider theme={{ colorScheme: colorScheme, primaryColor: 'teal' }} withGlobalStyles withNormalizeCSS>
            <AppShell
                header={<DashboardHeader toggleColorScheme={toggleColorScheme} />}
                navbar={
                    <Navbar p="md" hiddenBreakpoint="sm" hidden={!true} width={{ sm: 200, lg: 300 }}>
                        <NavLinks />
                    </Navbar>
                }
            >
                {props.children}
            </AppShell>
        </MantineProvider>
    )
}
