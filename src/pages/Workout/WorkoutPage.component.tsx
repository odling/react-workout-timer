import { useState } from 'react';
import { WorkoutTracker } from '../../components';
import { Button } from '@nextui-org/react';

const workout = {
  name: 'test',
  items: [
    {
      type: 'exercise',
      name: 'High Knees',
      duration: 3000,
    },
    {
      type: 'break',
      name: 'Rest',
      duration: 4000,
    },
    {
      type: 'exercise',
      name: 'Squats',
      duration: 3000,
    },
    {
      type: 'break',
      name: 'Rest',
      duration: 4000,
    },
    {
      type: 'exercise',
      name: 'Pushups',
      duration: 3000,
    },
    {
      type: 'break',
      name: 'Rest',
      duration: 4000,
    },
    {
      type: 'exercise',
      name: 'Pullups',
      duration: 3000,
    },
  ],
};

const WorkoutPage = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="py-unit-2xl h-full">
      <section className="h-full flex justify-center items-center flex-col px-unit-md">
        {isStarted ? (
          <WorkoutTracker data={workout} />
        ) : (
          <Button
            color="success"
            size="lg"
            className="text-white font-normal text-lg"
            onClick={() => setIsStarted(true)}
          >
            Start
          </Button>
        )}
      </section>
    </div>
  );
};

export default WorkoutPage;
