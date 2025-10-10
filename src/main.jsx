import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import App from './App.jsx'
import Adicionar from './Adicionar.jsx'
import Pesquisar from './Pesquisar.jsx'

const router = createBrowserRouter([
  { path: '/', element: App },
  { path: 'adicionar', element: Adicionar },
  { path: 'pesquisar', element: Pesquisar },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
