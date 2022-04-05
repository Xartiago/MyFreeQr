/* Libraries */
import { useRoutes } from 'react-router-dom'
/* Pages */
import { Auth } from '../Pages/Auth'
import { Files } from '../Pages/Components/Files'
import { Home } from '../Pages/Home'
import { ProtectedRoute } from './ProtectedRoute'

const protectedR = <ProtectedRoute><Auth /></ProtectedRoute>


export const AppRoutes = () => {
  const Routes = useRoutes([
    { path: '/', element: protectedR }, /* Authentication with email, gmail or facebook */
    { path: '/home', element: <Home /> }, /* Home when they can create QR codes */
    { path: '/qr/:id', element: <Files /> } /* All qr codes */
  ])
  /* Return the routes */
  return Routes
}
