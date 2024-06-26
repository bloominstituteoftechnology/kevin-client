import React, { useState } from 'react';
import { Box, Button, VStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';

const Sidebar = ({ projects, onNewProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [branch, setBranch] = useState('');

  const isFormValid = name && url && branch;

  const handleSave = () => {
    if (isFormValid) {
      onNewProject(name, url, branch);
      setName('');
      setUrl('');
      setBranch('');
      onClose();
    }
  };

  return (
    <Box w="300px" p={5} h="100vh" borderRight=".5px solid" borderColor="blue.300">
      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        New Project
      </Button>
      <VStack align="stretch" spacing={3}>
        {projects.map((project, index) => (
          <Box
            key={index}
            p={3}
            shadow="lg"
            borderRadius="lg"
            bg="gray.700"
            borderLeft="4px solid"
            borderRight=".5px solid"
            borderTop=".5px solid"
            borderBottom=".5px solid"
            borderColor="blue.300"
          >
            <Text fontWeight="bold" color="white">{project.name}</Text>
            <Text fontSize="sm" color="gray.300">{project.url}</Text>
            <Text fontSize="sm" color="gray.300">{project.branch}</Text>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired id="name" mb={4}>
              <FormLabel>Project Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl isRequired id="url" mb={4}>
              <FormLabel>GitHub URL</FormLabel>
              <Input value={url} onChange={(e) => setUrl(e.target.value)} />
            </FormControl>
            <FormControl isRequired id="branch">
              <FormLabel>Branch Name</FormLabel>
              <Input value={branch} onChange={(e) => setBranch(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave} isDisabled={!isFormValid}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Sidebar;