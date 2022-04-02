import { useRoutes } from 'react-router-dom'
import { Auth } from '../Pages/Auth'
import { Home } from '../Pages/Home'

export const AppRoutes = () => {
  const Routes = useRoutes([
    { path: '/', element: <Auth /> }, /* Authentication with email, gmail or facebook */
    { path: '/home', element: <Home /> } /* Home when they can create QR codes */
  ])
  /* Return the routes */
  return Routes
}
