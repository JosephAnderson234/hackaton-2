import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from '@contexts/AuthProvider.tsx'
import { RouterProvider } from 'react-router-dom'
import {router} from '@router/routes'


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>

  </StrictMode>
)
