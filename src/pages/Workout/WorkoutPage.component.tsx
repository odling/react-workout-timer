import { useCallback, useState } from 'react';
import { WorkoutTracker } from '../../components';
import { IWorkout } from '../../types';
import { Button } from '@nextui-org/react';

const workout: IWorkout = {
  rounds: 3,
  restBetweenRounds: 5,
  description: 'Week 1 - Lower Body',
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

type WorkoutMode = 'idle' | 'workout' | 'warmup';

const WorkoutPage = () => {
  const [mode, setMode] = useState<WorkoutMode>('idle');

  const handleStartWorkout = useCallback(() => {
    setMode('workout');
  }, []);

  const handleFinished = useCallback(() => {
    setMode('idle');
  }, []);

  return (
    <div className="py-unit-2xl h-full">
      <section className="h-full min-h-[500px] flex justify-center items-center flex-col px-unit-md">
        {mode === 'workout' ? (
          <WorkoutTracker data={workout} onFinished={handleFinished} />
        ) : (
          <>
            <h2>{workout.description}</h2>
            <Button variant="solid" color="success" size="lg" onPress={handleStartWorkout}>
              Go to workout
            </Button>
          </>
        )}
      </section>
    </div>
  );
};

export default WorkoutPage;
