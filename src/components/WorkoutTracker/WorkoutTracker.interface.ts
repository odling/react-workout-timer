import { IWorkout } from '../../types';

export default interface IWorkoutTrackerProps extends React.ComponentPropsWithoutRef<'div'> {
  data: IWorkout;
}
