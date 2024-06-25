// MessageBubble.js
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

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
        maxW="80%"
        my={2}
      >
        <Text>{message}</Text>
      </Flex>
    </Flex>
  );
};

export default MessageBubble;
