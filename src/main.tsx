import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';  // Giữ BrowserRouter ở đây
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Giữ BrowserRouter ở cấp cao nhất */}
      <QueryClientProvider client={queryClient}>
        <App /> {/* App sẽ sử dụng các route mà không cần thêm BrowserRouter */}
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
