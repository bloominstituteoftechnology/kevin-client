import React, { useState } from 'react';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, IconButton, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const Project = ({ name: initialName, url: initialUrl, branch: initialBranch, onUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);
  const [branch, setBranch] = useState(initialBranch);

  const handleSave = () => {
    onUpdate({ name, url, branch });
    onClose();
  };

  // Extract the part of the URL after 'https://github.com/', ensuring url is defined
  const displayUrl = url ? url.replace('https://github.com/', '') : '';

  return (
    <>
      <Box
        p={4}
        shadow="lg"
        borderRadius="lg"
        bg="gray.700"
        borderLeft="4px solid"
        borderRight=".5px solid"
        borderTop=".5px solid"
        borderBottom=".5px solid"
        borderColor="blue.300"
        position="relative"
      >
        <Text fontWeight="bold" color="white" pr={8}>{name}</Text>
        <Text fontSize="sm" color="gray.300" pr={8}>{displayUrl}</Text>
        <Text fontSize="sm" color="gray.300" pr={8}>{branch}</Text>
        <IconButton
          icon={<EditIcon />}
          aria-label="Edit Project"
          size="sm"
          position="absolute"
          top="10px"
          right="10px"
          onClick={onOpen}
        />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Project Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>GitHub URL</FormLabel>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Branch Name</FormLabel>
              <Input value={branch} onChange={(e) => setBranch(e.target.value)} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Project;
