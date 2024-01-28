import { IWorkout } from '../../types';

export default interface IWorkoutTrackerProps extends React.ComponentPropsWithoutRef<'div'> {
  data: IWorkout;
  finishMessage: string;
  finishButtonText: string;
  onFinished?: () => void;
  onQuit?: () => void;
}
