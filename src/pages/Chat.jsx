import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Header from '../components/Header';
import { Box, Flex } from '@chakra-ui/react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsLoading(true); // Set loading state to true when sending message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      color: 'blue.500',
      sender: 'user'
    };
    setMessages([...messages, userMessage]);
    const requestBody = {
      input: {
        query: newMessage
      },
      config: {},
      kwargs: {}
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}/generate/invoke`, requestBody);
      const aiResponse = response.data;
      if (aiResponse && aiResponse.output && aiResponse.output.content) {
        const aiMessage = {
          id: messages.length + 2,
          text: aiResponse.output.content,
          color: 'gray.700',
          sender: 'ai'
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
      } else {
        console.error("Received an unexpected response structure:", aiResponse);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    setIsLoading(false); // Set loading state to false after receiving response
    setNewMessage('');
  };

  return (
    <Box position="relative" p={5} h="100vh">
      <Header title="Chat" />
      <ChatHistory messages={messages} />
      <Flex position="absolute" bottom="0" left="0" right="0" justifyContent="center" p={4}>
        <ChatInput
          newMessage={newMessage}
          handleInputChange={(e) => setNewMessage(e.target.value)}
          handleSendMessage={handleSendMessage}
          loading={isLoading} // Pass loading state to ChatInput
        />
      </Flex>
    </Box>
  );
};

export default Chat;