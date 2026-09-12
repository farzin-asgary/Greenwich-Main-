/**
 * Greenwich Club Main Application Entry
 */

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AudioProvider } from './shared/ui/AudioPlayer';
import { AppRouter } from './app/router/AppRouter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AudioProvider>
        <AppRouter />
      </AudioProvider>
    </QueryClientProvider>
  );
}

