import React  from 'react'
import { Link } from 'react-router-dom';
import { Box, Button, HStack, Spacer, useColorMode } from '@chakra-ui/react';
import { SunIcon } from '@chakra-ui/icons';
import useSwr from 'swr';
import Users from './Users';
import fetcher from '../utility/fetcher';

export default function Dashboard() {
  const { data, error } = useSwr('/api/user', fetcher);

  const { toggleColorMode } = useColorMode();

  if (error) return 'Error'
  if (!data) return 'Loading...'

  return (
    <Box p="16">
      <HStack>
        <Button as={Link} to="/create" >New</Button>
        <Button as={Link} to="/similar" >Similar</Button>
        <Spacer />
        <Button onClick={toggleColorMode}><SunIcon /></Button>
      </HStack>
      {data.users.map(user => <Users {...user} />)}
    </Box>
  )
}
