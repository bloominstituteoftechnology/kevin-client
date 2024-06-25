import React, { useEffect, useRef } from 'react';
import { VStack } from '@chakra-ui/react';
import MessageBubble from '../components/MessageBubble';
import ReactMarkdown from 'react-markdown';

const ChatHistory = ({ messages }) => {
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
    >
      {messages.map((msg) => (
        msg.sender === 'ai' ? (
          <MessageBubble key={msg.id} color={msg.color} message={<ReactMarkdown>{msg.text}</ReactMarkdown>} sender={msg.sender} />
        ) : (
          <MessageBubble key={msg.id} color={msg.color} message={msg.text} sender={msg.sender} />
        )
      ))}
      <div ref={bottomRef} />  // Element to auto-scroll to
    </VStack>
  );
};

export default ChatHistory;
