export interface IExercise {
  type: 'exercise' | 'rest';
  description: string;
  quantity: number;
  isRepBased?: boolean;
}

export interface IWarmup {
  description: string;
  exercises: IExercise[];
  rounds: number;
  restBetweenRounds: number;
}

export interface IWorkout {
  description: string;
  exercises: IExercise[];
  warmup?: IWarmup;
  rounds: number;
  restBetweenRounds: number;
}
