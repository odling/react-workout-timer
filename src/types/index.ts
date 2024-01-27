export interface IExercise {
  type: 'exercise' | 'rest';
  description: string;
  quantity: number;
  isRepBased?: boolean;
}

export interface IWorkout {
  description: string;
  exercises: IExercise[];
  rounds: number;
  restBetweenRounds: number;
}
