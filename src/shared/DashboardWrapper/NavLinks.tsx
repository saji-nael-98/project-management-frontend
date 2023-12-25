import { NavLink, Stack, Text } from '@mantine/core'
import { IconHome2, IconShield, IconTie } from '@tabler/icons-react'
import { Fragment, useMemo } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
const NavLinks = () => {
    const links = useMemo(() => ([
        {
            path: '/',
            label: 'Dashboard',
            icon: <IconHome2 size="1rem" stroke={1.5} />
        },
        {
            path: '/roles',
            label: 'Roles',
            icon: <IconTie size="1rem" stroke={1.5} />
        },
        {
            path: '/permissions',
            label: 'Permissions',
            icon: <IconShield size="1rem" stroke={1.5} />
        }
    ]), [])
    return (
        <>
            <Stack spacing='xs'>
                <Text size='sm' c="dimmed">Resource</Text>
                {links?.map(i => (
                    <RouterNavLink key={i.path} to={i.path} style={{ textDecoration: 'none' }}>
                        {({ isActive }) => (
                            <Fragment >
                                {!!i.icon ? <NavLink label={i.label} icon={i.icon} active={isActive} /> : <NavLink label={i.label} active={isActive} />}
                            </Fragment>
                        )}
                    </RouterNavLink>
                ))}

            </Stack></>
    )
}

export default NavLinks