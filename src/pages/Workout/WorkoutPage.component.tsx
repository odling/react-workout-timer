import { WorkoutTracker } from '../../components';
import { IWorkout } from '../../types';

const workout: IWorkout = {
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
      repBased: true,
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
  return (
    <div className="py-unit-2xl h-full">
      <section className="h-full flex justify-center items-center flex-col px-unit-md">
        <WorkoutTracker data={workout} />
      </section>
    </div>
  );
};

export default WorkoutPage;
