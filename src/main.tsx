import { createRoot } from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <BrowserRouter>
      {' '}
      <App />
    </BrowserRouter>
  </RecoilRoot>,
);
