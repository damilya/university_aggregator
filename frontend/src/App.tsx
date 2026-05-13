import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import RankingsPage from './pages/RankingsPage';
import UniversityDetailPage from './pages/UniversityDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 2,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RankingsPage />} />
          <Route path="/university/:id" element={<UniversityDetailPage />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: '#f8f9fa' }}>
                <h1 className="text-2xl font-bold" style={{ color: '#1a1a2e' }}>
                  404 — Page not found
                </h1>
                <a href="/" className="text-sm font-medium hover:underline" style={{ color: '#1a2b4a' }}>
                  Go to Rankings
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
