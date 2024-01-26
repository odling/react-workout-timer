import { WorkoutTracker } from '../../components';

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
