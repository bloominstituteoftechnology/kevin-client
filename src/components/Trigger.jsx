import React from 'react';
import { Button } from '@chakra-ui/react';

const Trigger = ({ label, onClick, isLoading }) => {
  return (
    <Button colorScheme="blue" onClick={onClick} size='xs' isLoading={isLoading}>
      {label}
    </Button>
  );
};

export default Trigger;
