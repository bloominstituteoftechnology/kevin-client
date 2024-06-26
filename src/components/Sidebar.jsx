import React, { useState } from 'react';
import { Box, Button, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, useDisclosure } from '@chakra-ui/react';
import Project from './Project';

const Sidebar = ({ projects, onNewProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [branch, setBranch] = useState('');

  const isFormValid = name && url && branch;

  const handleSave = () => {
    if (isFormValid) {
      onNewProject([...projects, { name, url, branch }]); // Ensure the new project is added to the projects array
      setName('');
      setUrl('');
      setBranch('');
      onClose();
    }
  };

  const handleUpdateProject = (index, updatedProject) => {
    const updatedProjects = projects.map((project, idx) => 
      idx === index ? updatedProject : project
    );
    onNewProject(updatedProjects);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, idx) => idx !== index);
    onNewProject(updatedProjects);
  };

  return (
    <Box w="300px" p={5} h="100vh" borderRight=".5px solid" borderColor="blue.300">
      <Button colorScheme="blue" mb={4} onClick={onOpen}>
        New Project
      </Button>
      <VStack align="stretch" spacing={3}>
        {projects.map((project, index) => (
          <Project
            key={index}
            name={project.name}
            url={project.url}
            branch={project.branch}
            onUpdate={(updatedProject) => handleUpdateProject(index, updatedProject)}
            onDelete={() => handleDeleteProject(index)}
          />
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
