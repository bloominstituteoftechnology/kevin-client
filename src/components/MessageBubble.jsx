import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const MessageBubble = ({ color, message, sender }) => {
  return (
    <Flex
      w="full"
      justifyContent={sender === 'ai' ? 'flex-start' : 'flex-end'}
    >
      <Flex
        bg={color}
        color="white"
        p={3}
        borderRadius="lg"
        maxW="70%"
        my={2}
        wordBreak="break-word"
      >
        <Box fontSize="xs">
          {message}
        </Box>
      </Flex>
    </Flex>
  );
};

export default MessageBubble;
