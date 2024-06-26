import React from 'react';
import { HStack, Spacer, Box, Heading} from '@chakra-ui/react';
import AuthenticationButton from './AuthenticationButton';

const Header = ({ title }) => {

  return (
    <Box p={2}>
    <HStack width="100%">
      <Heading size='lg'>{title}</Heading>
      <Spacer />
      <AuthenticationButton />
    </HStack>
  </Box>
  );
};

export default Header;