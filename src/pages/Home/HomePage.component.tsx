import { Button, useDisclosure, Modal } from '@nextui-org/react';
import { useNavigate } from 'react-router';
import { LoginOrSignup } from '../../components';
import { useContext, useEffect } from 'react';
import SessionContext from '../../context';
import path from '../../config/path';

const HomePage = () => {
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const navigate = useNavigate();

  const { currentSession } = useContext(SessionContext);
  const isLoggedIn = !!currentSession;

  useEffect(() => {
    isLoggedIn && navigate(path.workouts);
  }, [isLoggedIn, navigate]);

  return (
    <section className="page-wrapper justify-center gap-unit-xl from-primary to-success bg-gradient-to-br bg-clip-text font-semibold text-xl text-center">
      <h1 className="text-transparent font-bold text-3xl">Welcome</h1>
      <div className="flex flex-col items-center gap-unit-lg text-transparent">
        <>
          <p>Ready to transform your body?</p>
          <p>
            This app is designed to help you achieve your goals. Just follow the workouts and
            remember,
          </p>
          <p>Hard work pays off!</p>
        </>
      </div>
      <Button
        size="lg"
        variant="faded"
        onPress={onModalOpen}
        className="bg-gradient-to-l bg-clip-text from-success to-primary"
      >
        <span className="text-transparent">Get started</span>
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
    </section>
  );
};

export default HomePage;
