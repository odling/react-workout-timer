interface IExercise {
  type: string;
  name: string;
  duration: number;
}

interface IWorkout {
  name: string;
  items: IExercise[];
}

export default interface IWorkoutTrackerProps extends React.ComponentPropsWithoutRef<'div'> {
  data: IWorkout;
}
