import { useCallback, useState } from 'react';
import { WorkoutTracker } from '../../components';
import { IWorkout } from '../../types';
import { Button } from '@nextui-org/react';

const workout: IWorkout = {
  rounds: 3,
  restBetweenRounds: 5,
  description: 'test',
  exercises: [
    {
      type: 'exercise',
      description: 'High Knees',
      quantity: 3,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 4,
    },
    {
      type: 'exercise',
      description: 'Squats',
      quantity: 3,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 4,
    },
    {
      type: 'exercise',
      description: 'Pushups',
      quantity: 3,
    },
    {
      type: 'rest',
      description: 'Rest',
      quantity: 4,
    },
    {
      type: 'exercise',
      description: 'Pullups',
      quantity: 3,
    },
  ],
};

const WorkoutPage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const handleStartWorkout = useCallback(() => {
    setIsStarted(true);
  }, []);
  return (
    <div className="py-unit-2xl h-full">
      <section className="h-full flex justify-center items-center flex-col px-unit-md">
        {isStarted ? (
          <WorkoutTracker data={workout} />
        ) : (
          <>
            <h2>{workout.description}</h2>
            <Button
              color="success"
              size="lg"
              className="text-white font-normal text-lg"
              onPress={handleStartWorkout}
            >
              Go to workout
            </Button>
          </>
        )}
      </section>
    </div>
  );
};

export default WorkoutPage;
