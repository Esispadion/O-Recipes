import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/reset.css'
import './index.css'
import App from './App.tsx'

import 'semantic-ui-css/semantic.min.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
