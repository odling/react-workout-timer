import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import supabase from '../../api';

const tagTypes = ['Workouts', 'Exercises'];

const baseQuery = fetchBaseQuery({
  baseUrl: `${String(import.meta.env.VITE_SUPABASE_URL)}/rest/v1`,
  prepareHeaders: async (headers) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    headers.set('Content-Type', 'application/json');
    headers.set('Apikey', String(import.meta.env.VITE_SUPABASE_KEY));
    headers.set('Authorization', `Bearer ${session?.access_token}`);
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
