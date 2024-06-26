import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import Header from '../components/Header';
import { Box, Flex } from '@chakra-ui/react';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';
import Sidebar from '../components/Sidebar';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    setIsLoading(true);
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
    setIsLoading(false);
    setNewMessage('');
  };

  const handleNewProject = (name, url, branch) => {
    setProjects([...projects, { name, url, branch }]);
  };

  const handleTrigger = async (endpoint, messageId) => {
    setIsLoading(true);
    const message = messages.find(msg => msg.id === messageId && msg.sender === 'ai');
    if (!message) {
      setIsLoading(false);
      return;
    }

    const requestBody = {
      code: message.text
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URI}${endpoint}`, requestBody);
      const triggerResponse = response.data;
      if (triggerResponse && triggerResponse.output && triggerResponse.output.content) {
        const triggerMessage = {
          id: messages.length + 1,
          text: triggerResponse.output.content,
          color: 'gray.700',
          sender: 'ai'
        };
        setMessages(prevMessages => [...prevMessages, triggerMessage]);
      } else {
        console.error("Received an unexpected response structure:", triggerResponse);
      }
    } catch (error) {
      console.error(`Error fetching response from ${endpoint}:`, error);
    }
    setIsLoading(false);
  };

  return (
    <Flex h="100vh">
      <Sidebar projects={projects} onNewProject={handleNewProject} />
      <Box flex="1" position="relative" p={5}>
        <Header title="Chat" />
        <ChatHistory messages={messages} onTrigger={handleTrigger} isLoading={isLoading} />
        <Flex position="absolute" bottom="0" left="0" right="0" justifyContent="center" p={4}>
          <ChatInput
            newMessage={newMessage}
            handleInputChange={(e) => setNewMessage(e.target.value)}
            handleSendMessage={handleSendMessage}
            loading={isLoading}
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Chat;
