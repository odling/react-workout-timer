import { Button, useDisclosure, Modal } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { LoginOrSignup } from '../../components';
import { useContext } from 'react';
import SessionContext from '../../context';

const HomePage = () => {
  const navigate = useNavigate();

  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const { currentSession } = useContext(SessionContext);
  const isLoggedIn = !!currentSession;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-unit-xl from-primary to-success bg-gradient-to-br bg-clip-text font-semibold text-xl text-center px-unit-md">
      <h1 className="text-transparent font-bold text-3xl">
        {'Welcome' + (isLoggedIn ? ` back ${currentSession?.user.user_metadata.display_name}` : '')}
      </h1>
      <div className="flex flex-col items-center gap-unit-lg text-transparent">
        {isLoggedIn ? (
          <p>Ready to transform your body?</p>
        ) : (
          <>
            <p>Ready to transform your body?</p>
            <p>
              This app is designed to help you achieve your goals. Just follow the workouts and
              remember,
            </p>
            <p>Hard work pays off!</p>
          </>
        )}
      </div>
      <Button
        size="lg"
        variant="faded"
        onPress={currentSession ? () => navigate('workouts') : onModalOpen}
        className="bg-gradient-to-l bg-clip-text from-success to-primary"
      >
        <span className="text-transparent">{isLoggedIn ? 'See all workouts' : 'Get started'}</span>
      </Button>
      <Modal
        size="lg"
        isOpen={isModalOpen}
        onClose={onModalClose}
        backdrop="blur"
        placement="center"
      >
        <LoginOrSignup />
      </Modal>
    </div>
  );
};

export default HomePage;
