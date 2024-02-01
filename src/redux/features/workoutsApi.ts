import { api } from './api';
import { IWorkout } from '../../types';

export const workoutsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<IWorkout[], void>({
      query: () => ({
        url: `/rest/v1/workouts?select`,
      }),
      providesTags: ['Workouts'],
    }),
  }),
});

export const { useGetWorkoutsQuery } = workoutsApi;
