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
        />
        <InputRightElement width="4.5rem">
          {loading ? (
            <Spinner size="sm" />
          ) : (
            <Button variant='outline' colorScheme='teal' borderRadius="lg" size="sm" onClick={handleSendMessage}>
              Send
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default ChatInput;
