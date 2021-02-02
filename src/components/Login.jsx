import React from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Button, Input, Stack, Heading, useToast } from '@chakra-ui/react';
import { useAuth } from './Auth';

export default function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();
  const toast = useToast();
  async function onLogin(event) {
    event.preventDefault();
    const form = new FormData(event.target);

    const resp = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: form.get('email'),
        password: form.get('password'),
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: "same-origin"
    })

    const { user, message } = await resp.json();
    if (message === 'Incorrect password.' || message === 'Incorrect username.' || !user){
      toast({
        title: message,
        description: 'Try again',
        status: 'error',
        duration: 2000,
        position: 'bottom-left'
      })
      return;
    }
    setAuth(user);
    history.push('/');
  }
  return (
    <Box d="flex" justifyContent="center" alignItems="center" h="full">
      <Stack as="form" width="2xl" height="2xl" justifyContent="center" onSubmit={onLogin}>
        <Heading>Login</Heading>
        <Input name="email" type="email" placeholder="Email" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit" >Login</Button>
      </Stack>
    </Box>
  )
}
