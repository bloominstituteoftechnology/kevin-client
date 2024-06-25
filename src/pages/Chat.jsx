import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, text: newMessage }]);
    setNewMessage('');
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <Box p={5}>
      <Header title="Chat" />
      <Flex justifyContent="center" mt={4}>
        <ChatInput
          newMessage={newMessage}
          handleInputChange={handleInputChange}
          handleSendMessage={handleSendMessage}
        />
      </Flex>
    </Box>
  );
};

export default Chat;
