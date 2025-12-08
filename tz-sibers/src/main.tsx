import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChatProvider } from './contexts/ChatContext.tsx'
import './styles/main.css'
import './styles/reset.css'
import './styles/fonts.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChatProvider>
        <App />
      </ChatProvider>
    </QueryClientProvider>
  </StrictMode>,
)
