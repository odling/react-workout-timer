import { ExerciseDatabase } from '../../types';
import { api } from './api';

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<ExerciseDatabase[], void>({
      query: () => ({
        url: `/exercise?select=id,description`,
        method: 'GET',
      }),
      providesTags: ['Exercises'],
    }),
    addExercise: builder.mutation<void, Pick<ExerciseDatabase, 'description'>>({
      query: (args) => ({
        url: `/exercise`,
        method: 'POST',
        body: JSON.stringify(args),
      }),
    }),
  }),
});

export const { useGetExercisesQuery, useAddExerciseMutation } = exercisesApi;
