import React from 'react';
import { HStack, Spacer, Box, Heading} from '@chakra-ui/react';
import AuthenticationButton from './AuthenticationButton';

const Header = ({ title }) => {

  return (
    <Box p={10}>
    <HStack width="100%">
      <Heading size='xl'>{title}</Heading>
      <Spacer />
      <AuthenticationButton />
    </HStack>
  </Box>
  );
};

export default Header;