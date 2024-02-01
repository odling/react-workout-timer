import {
  Input,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tabs,
  Tab,
  Link,
  Button,
} from '@nextui-org/react';
import { useCallback, useState } from 'react';
import supabase from '../../api';
import { useNavigate } from 'react-router';
import path from '../../config/path';
import { toast } from 'react-toastify';
import WorkoutIcon from '../../assets/workout.svg?react';

const LoginOrSignup = () => {
  const [selected, setSelected] = useState('login');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      void (async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const { error } = await supabase.auth.signInWithPassword({
          email: String(formData.get('email') ?? ''),
          password: String(formData.get('password') ?? ''),
        });
        setIsLoading(false);
        if (error) {
          toast.error(error.message);
          return;
        }
        navigate(path.workouts);
      })(e);
    },
    [navigate],
  );

  const handleSignup: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    void (async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const { data, error } = await supabase.auth.signUp({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
        options: {
          data: {
            display_name: String(formData.get('display_name') ?? ''),
          },
        },
      });
      setIsLoading(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(
        `A confirmation email sent to ${data.user?.email}. Please confirm your email to finish signup process.`,
        { autoClose: 5000 },
      );
    })(e);
  }, []);

  return (
    <ModalContent>
      <ModalHeader>
        <WorkoutIcon className="h-12 w-12 mx-auto" />
      </ModalHeader>
      <ModalBody>
        <Tabs
          fullWidth
          size="md"
          color="success"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={(key) => setSelected(String(key))}
        >
          <Tab key="login" title="Login">
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <Input
                name="email"
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                name="password"
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <p className="text-center text-small">
                Need to create an account?{' '}
                <Link size="sm" color="success" onPress={() => setSelected('sign-up')}>
                  Sign up
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="success" type="submit" isLoading={isLoading}>
                  Login
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="sign-up" title="Sign up">
            <form className="flex flex-col gap-4 h-[300px]" onSubmit={handleSignup}>
              <Input
                name="display_name"
                isRequired
                label="Name"
                placeholder="Enter your name"
                type="text"
              />
              <Input
                name="email"
                isRequired
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <Input
                name="password"
                isRequired
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <p className="text-center text-small">
                Already have an account?{' '}
                <Link size="sm" color="success" onPress={() => setSelected('login')}>
                  Login
                </Link>
              </p>
              <div className="flex gap-2 justify-end">
                <Button fullWidth color="success" type="submit" isLoading={isLoading}>
                  Sign up
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </ModalBody>
    </ModalContent>
  );
};

export default LoginOrSignup;
