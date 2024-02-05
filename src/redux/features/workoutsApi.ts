import { api } from './api';
import { IWorkout } from '../../types';

export const workoutsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWorkouts: builder.query<IWorkout[], void>({
      query: () => ({
        url: `/workout?select=id,description,rounds,rest_between_rounds,use_default_warmup,exercise_list(is_rep_based,quantity,exercise(id,description))`,
      }),
      providesTags: ['Workouts'],
    }),
  }),
});

export const { useGetWorkoutsQuery } = workoutsApi;
