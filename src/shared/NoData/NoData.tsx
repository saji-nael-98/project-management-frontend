import { Box, Flex, Text } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'
import React from 'react'

export const NoData = () => {
    return (
        <Flex justify='center' h={300} align='center' direction='column'>

            <Flex mb='sm' justify='center' align='center' sx={(theme) => ({
                height: 40,
                width: 40,
                borderRadius: '50%',
                color: 'black',
                backgroundColor: theme.colorScheme == 'light' ? theme.colors.gray[1] : theme.colors.gray[4]
            })}>
                <IconDatabaseOff />
            </Flex>
            <Text c="dimmed">No Data</Text>

        </Flex>
    )
}
