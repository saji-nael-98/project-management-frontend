import { Box, Flex, Paper, Text } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'
import React from 'react'

export const NoData = () => {
    return (
        <Paper h={300} sx={(theme) => ({
            backgroundColor: theme.colorScheme == 'light' ? theme.colors.white : theme.colors.dark[7]
        })}>
            <Flex h={'100%'} justify='center' align='center' direction='column'>

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
        </Paper>
    )
}
