import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Box>
      <Header title="Chat" />
    </Box>
  );
};

export default Home;
