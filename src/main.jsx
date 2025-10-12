import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Adicionar from './Adicionar.jsx'
import Pesquisar from './Pesquisar.jsx'
import Alterando from './Alterando.jsx'
import Agendar from './Agendamento.jsx'
import Reviews from './Reviews.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/adicionar', element: <Adicionar /> },
  { path: '/pesquisar', element: <Pesquisar /> },
  { path: '/alterando', element: <Alterando /> },
  { path: '/agendar', element: <Agendar /> },
  { path: '/reviews', element: <Reviews /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
