import React from 'react';
import { Button, Input, InputGroup, InputRightElement, FormControl, Spinner } from '@chakra-ui/react';

const ChatInput = ({ newMessage, handleInputChange, handleSendMessage, loading }) => {
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
          _focus={{ borderColor: 'blue.300', backgroundColor: 'gray.900' }} 
        />
        <InputRightElement width="4.5rem">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <Button colorScheme='blue' borderRadius="lg" size="sm" onClick={handleSendMessage}>
              Send
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default ChatInput;
