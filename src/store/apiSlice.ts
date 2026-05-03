import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ContentItem {
  id: string;
  type: 'news' | 'recommendation' | 'social';
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Connects to Next.js API routes
  endpoints: (builder) => ({
    getPersonalizedFeed: builder.query<ContentItem[], { categories: string[], search?: string }>({
      query: (arg) => {
        const params = new URLSearchParams();
        if (arg.categories.length > 0) {
          arg.categories.forEach(c => params.append('category', c));
        }
        if (arg.search) {
          params.append('search', arg.search);
        }
        return `feed?${params.toString()}`;
      },
    }),
    getTrendingContent: builder.query<ContentItem[], void>({
      query: () => 'trending',
    }),
  }),
});

export const { useGetPersonalizedFeedQuery, useGetTrendingContentQuery } = apiSlice;
