import { Tables } from '../../generated-types/supabase';

export interface IExercise {
  type: 'exercise' | 'rest';
  description: string;
  quantity: number;
  isRepBased?: boolean;
}

export type ExerciseDatabase = Omit<Tables<'exercise'>, 'user_id' | 'created_at'>;

export interface IWarmup {
  description: string;
  exercises: IExercise[];
  rounds: number;
  restBetweenRounds: number;
}

export interface IWorkout {
  id: string;
  description: string;
  exercises: IExercise[];
  rounds: number;
  restBetweenRounds: number;
  warmup?: IWarmup;
  useDefaultWarmup: boolean;
}
