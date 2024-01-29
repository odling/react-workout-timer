import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-unit-xl from-primary to-success bg-gradient-to-br bg-clip-text font-semibold text-xl text-center px-unit-md">
      <h1 className="text-transparent font-bold text-3xl">Welcome</h1>
      <p className="text-transparent">Ready to transform your body?</p>
      <p className="text-transparent">
        This app is designed to help you achieve your goals. Just follow the workouts and remember,
      </p>
      <p className="text-transparent">Hard work pays off!</p>
      <Button
        size="lg"
        variant="faded"
        onPress={() => navigate('workouts')}
        className="bg-gradient-to-l bg-clip-text from-success to-primary"
      >
        <span className="text-transparent">See all workouts</span>
      </Button>
    </div>
  );
};

export default HomePage;
