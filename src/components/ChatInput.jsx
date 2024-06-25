// ChatInput.js
import React from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
} from '@chakra-ui/react';

const ChatInput = ({ newMessage, handleInputChange, handleSendMessage }) => {
  return (
    <FormControl as="form" onSubmit={(e) => e.preventDefault()} width="50%">
      <InputGroup size="lg">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Message Kevin"
          value={newMessage}
          onChange={handleInputChange}
          variant="filled"
          borderRadius="lg"
          _focus={{ borderColor: 'teal.500', backgroundColor: 'gray.800' }}  // Teal outline and shadow on focus
        />
        <InputRightElement width="4.5rem">
          <Button colorScheme='teal' borderRadius="lg" size="sm" onClick={handleSendMessage}>
            Send
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default ChatInput;
