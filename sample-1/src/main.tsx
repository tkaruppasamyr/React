import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import EcommerceRouter  from "./apps/ecommerce/routers/EcommerceRouter";

import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={EcommerceRouter} />
  </StrictMode>,
)
