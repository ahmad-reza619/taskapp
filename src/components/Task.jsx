import React, { useState } from 'react'
import { mutate } from 'swr';
import {
  HStack, Text, Button, useDisclosure, Input, useToast, ModalCloseButton,
  Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalFooter,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useAuth } from './Auth';

export default function Task({ name, id, email }) {
  const [auth] = useAuth()
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [nameState, setNameState] = useState(name);
  const toast = useToast();
  const onChange = ({ target: { value } }) => setNameState(value);
  function onDelete() {
    fetch(`/api/task/${id}`, {
      method: 'DELETE',
      body: { user: auth },
    })
    mutate('/api/user');
  }
  async function editTask() {
    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          user: email,
          name: nameState,
          completed: false
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        credentials: "same-origin"
      })
      const data = await response.json();
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
            <Input value={nameState} onChange={onChange} />
          </ModalBody>

          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={editTask}>Edit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <HStack borderRadius="md" my="1" p="4">
        <Text flex="5">{name}</Text>
        <Button px="4" onClick={onOpen} > <EditIcon /></Button>
        <Button px="4" onClick={onDelete}><DeleteIcon color="red" /></Button>
      </HStack>
    </>
  )
}
