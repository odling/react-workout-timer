import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper">
      <h1 className="text-foreground font-semibold text-3xl text-center">Welcome</h1>
      <div className="w-full h-full flex justify-center items-center">
        <Button size="lg" variant="solid" color="success" onPress={() => navigate('workouts')}>
          See all workouts
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
