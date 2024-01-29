import { IWorkout, IWarmup } from '../../types';

export default interface IWorkoutTrackerProps extends React.ComponentPropsWithoutRef<'div'> {
  data: IWorkout | IWarmup;
  finishMessage: string;
  finishButtonText: string;
  onFinished?: () => void;
  onQuit?: () => void;
}
