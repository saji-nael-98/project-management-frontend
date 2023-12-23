import { Button, Flex, Title, useMantineTheme } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export const Forbidden = () => {
    const theme = useMantineTheme()
    const navigate = useNavigate()
    function clickHandler() {
        navigate(-1)

    }
    return (
        <Flex bg='dark' justify='center' align='center' h={'100vh'} direction='column'>
            <Title c={theme.primaryColor} order={1} fz={100} weight={700}>403</Title>
            <Title order={2} weight={700} c="dimmed">Forbidden</Title>
            <Button w={150} tt='capitalize' mt={25} onClick={clickHandler}>Back</Button>
        </Flex>
    )
}
