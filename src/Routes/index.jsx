/* Libraries */
import { useRoutes } from 'react-router-dom'
/* Pages */
import { Auth } from '../Pages/Auth'
import { Home } from '../Pages/Home'
import { ProtectedRoute } from './protectedRoute'

const protectedR = <ProtectedRoute><Auth /></ProtectedRoute>


export const AppRoutes = () => {
  const Routes = useRoutes([
    { path: '/', element:  protectedR}, /* Authentication with email, gmail or facebook */
    { path: '/home', element: <Home /> } /* Home when they can create QR codes */
  ])
  /* Return the routes */
  return Routes
}
