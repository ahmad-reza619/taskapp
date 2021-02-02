import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Stack, Button, useToast, Breadcrumb, Input, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export default function CreateUser() {
  const [createdUsers, setUsers] = useState(['john@mail.com']);
  const history = useHistory();
  const toast = useToast();
  function addUser() {
    setUsers(u => [...u, 'example@mail.com']);
  }
  const onChange = i => evt => {
    const copy = [...createdUsers];
    copy[i] = evt.target.value;
    setUsers(copy);
  }

  const submit = async () => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          Users: createdUsers,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        credentials: "same-origin"
      })
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        toast({
          title: 'Error',
          status: 'error',
        })
        return;
      }
      history.push('/')
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <Stack p="16">
      <Breadcrumb mb="4">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Create User</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {createdUsers.map((user, i) => (
        <Input
          value={user}
          key={i}
          placeholder="username"
          onChange={onChange(i)}
        />
      ))}
      <Button onClick={addUser}>Add User</Button>
      <Button onClick={submit}>Save</Button>
    </Stack>
  )
}
