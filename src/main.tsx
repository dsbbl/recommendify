import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App';

import './index.css';

// Setup React Query Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
);
