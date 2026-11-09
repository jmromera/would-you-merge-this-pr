import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SoundProvider } from '@/shared/sound/SoundProvider'
import App from './App'
import { ErrorBoundary } from './ErrorBoundary'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SoundProvider>
        <App />
      </SoundProvider>
    </ErrorBoundary>
  </StrictMode>,
)
