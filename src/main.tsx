
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App'
// import 'modern-normalize'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root') as HTMLDivElement).render(
    <QueryClientProvider client={queryClient}>
    <StrictMode>
        <App/>
        </StrictMode>
    </QueryClientProvider>
)