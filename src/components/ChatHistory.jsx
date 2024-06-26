import React, { useEffect, useRef } from 'react';
import { VStack, HStack, Box } from '@chakra-ui/react';
import MessageBubble from '../components/MessageBubble';
import ReactMarkdown from 'react-markdown';
import Trigger from '../components/Trigger';

const ChatHistory = ({ messages, onTrigger, isLoading }) => {
  const bottomRef = useRef(null);  // Reference to automatically scroll to bottom of messages

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });  // Auto-scroll to new messages
  }, [messages]);

  return (
    <VStack
      spacing={4}
      overflowY="auto"
      maxHeight="calc(100vh - 220px)"  // Adjust as needed
      p={4}
      align="stretch"
    >
      {messages.map((msg) => (
        <Box key={msg.id}>
          <MessageBubble
            color={msg.color}
            message={msg.sender === 'ai' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
            sender={msg.sender}
          />
          {msg.sender === 'ai' && (
            <HStack spacing={2} align="flex-start">
              <Trigger label="Test Code" onClick={() => onTrigger('/test/invoke', msg.id)} isLoading={isLoading} />
              <Trigger label="Review Code" onClick={() => onTrigger('/review/invoke', msg.id)} isLoading={isLoading} />
              <Trigger label="Pull Request" onClick={() => onTrigger('/pr/invoke', msg.id)} isLoading={isLoading} />
            </HStack>
          )}
        </Box>
      ))}
      <div ref={bottomRef} />
    </VStack>
  );
};

export default ChatHistory;
