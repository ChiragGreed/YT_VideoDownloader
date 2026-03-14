import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import DownloadContextProvider from '../src/Features/Home/state/download.context.jsx'

createRoot(document.getElementById('root')).render(

  <DownloadContextProvider>
    <App />
  </DownloadContextProvider>

)
