import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { worker } from './mocks/setupWorker'
import { Provider } from 'react-redux'
import store from './store'

const queryClient = new QueryClient()

if (import.meta.env.DEV) {
  void worker.start({ onUnhandledRequest: 'warn' })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
