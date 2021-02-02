import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import Select from 'react-select';
import useSwr from 'swr';
import fetcher from '../utility/fetcher';
import { Box, Stack, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Task from './Task';

export default function Similar() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { data, error } = useSwr('/api/user', fetcher);
  const { data: tasks, error: tasksErr } = useSwr(`/api/task/common?user=${JSON.stringify(selectedUsers.map(u => u.value))}`, fetcher);

  if (error || tasksErr) return 'Error';
  if (!data) return 'Loading...'

  const change = v => setSelectedUsers(v);
  return (
    <Box p="16">
      <Breadcrumb mb="4">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Similar Task</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Select
        options={data.users.map(u => ({ label: u.email, value: u.email }))}
        isMulti
        onChange={change}
      />
      <Stack>
        {tasks && tasks.task.map(task => <Task {...task} />)}
      </Stack>
    </Box>
  )
}
