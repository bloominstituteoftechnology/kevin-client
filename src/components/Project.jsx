import React, { useState } from 'react';
import { Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, IconButton, FormControl, FormLabel, Input, useDisclosure, Collapse, Flex } from '@chakra-ui/react';
import { EditIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const Project = ({ name: initialName, url: initialUrl, branch: initialBranch, onUpdate, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState(initialName);
  const [url, setUrl] = useState(initialUrl);
  const [branch, setBranch] = useState(initialBranch);
  const [isConnected, setIsConnected] = useState(false);
  const { isOpen: isConnectModalOpen, onOpen: onConnectModalOpen, onClose: onConnectModalClose } = useDisclosure();
  const { isOpen: isAdvancedOpen, onToggle: onAdvancedToggle } = useDisclosure();

  const handleSave = () => {
    onUpdate({ name, url, branch });
    onClose();
  };

  const handleConnect = () => {
    setIsConnected(true);
    onConnectModalClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose(); // Close the modal after deletion
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
        <Button
          size="xs"
          colorScheme={isConnected ? "green" : "gray"}
          position="absolute"
          bottom="10px"
          right="10px"
          onClick={onConnectModalOpen}
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
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
            <Flex align="center" mt={4} onClick={onAdvancedToggle} cursor="pointer">
              <Text mr={2} fontSize="1rem" fontWeight={500}>Advanced</Text>
              {isAdvancedOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
            <Collapse in={isAdvancedOpen} animateOpacity>
              <Box mt={4}>
                <Text mb={2} color="red.300">This action cannot be undone.</Text>
                <Button onClick={handleDelete} colorScheme="red">
                  Delete Project
                </Button>
              </Box>
            </Collapse>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSave} mr={2}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isConnectModalOpen} onClose={onConnectModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to connect to this project?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleConnect} mr={2}>
              Connect
            </Button>
            <Button variant="ghost" onClick={onConnectModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Project;