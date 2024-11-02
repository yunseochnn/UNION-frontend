import { createRoot } from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// 뷰포트 높이 설정 함수
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 처음 로딩과 창 크기 변경 시 --vh 설정
setViewportHeight();
window.addEventListener('resize', setViewportHeight);

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
