import { createRoot } from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        <div className="center-content">
          <App />
        </div>
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>,
);
