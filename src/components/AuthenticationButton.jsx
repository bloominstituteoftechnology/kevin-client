import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Menu, MenuButton, MenuList, MenuItem, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";

const AuthenticationButton = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAccountClick = () => {
    onOpen();
  };

  return (
    <>
      {isAuthenticated ? (
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
            <Avatar name={user?.name} src={user?.picture} size="sm" />
          </MenuButton>
          <MenuList p={2}>
            <MenuItem onClick={handleAccountClick}>
              My Account
            </MenuItem>
            <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin }})}>
              Log Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button colorScheme="blue" onClick={() => loginWithRedirect()}>
          Log In
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Avatar mb={5} name={user?.name} src={user?.picture} size="md" />
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthenticationButton;
