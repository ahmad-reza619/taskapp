import React, { useState } from 'react'
import { mutate } from 'swr';
import {
  HStack, Stack, Text, Button, Box, ModalCloseButton, Input, useToast, useColorModeValue,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalFooter,
} from '@chakra-ui/react';
import Task from './Task';

export default function Users({ email, Tasks }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [newTask, setNewTask] = useState(['Task 1'])
  const toast = useToast();
  const bg = useColorModeValue('whitesmoke', 'grey');
  const onChangeNewTask = i => evt => {
    const copy = [...newTask];
    copy[i] = evt.target.value;
    setNewTask(copy);
  }
  const onSaveNew = async () => {
    try {
      const response = await fetch('/api/assign', {
        method: 'POST',
        body: JSON.stringify({
          user: email,
          tasks: newTask,
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
      mutate('/api/user');
      onClose();
    } catch(error) {
      console.error(error);
    }
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {newTask.map((task, i) => (
                <Input value={task} key={i} onChange={onChangeNewTask(i)} placeholder="Task name" />
              ))}
              <Button onClick={() => setNewTask(t => [...t, 'Task'])}>Add</Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={onSaveNew} >Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack
        borderRadius="md"
        border="1px"
        borderColor="grey.300"
        my="4"
        boxShadow="sm"
      >
        <HStack spacing="2" borderRadius="md" p="4">
          <Text flex="1" >
            {email}
          </Text>
          <Button onClick={onOpen}>New</Button>
        </HStack>
        <Box bg={bg}>
          {Tasks.map(t => <Task email={email} {...t} />)}
        </Box>
      </Stack>
    </>
  )
}
