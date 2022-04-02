import { useRoutes } from 'react-router-dom'
import { Auth } from '../Pages/Auth'

export const AppRoutes = () => {

  const Routes = useRoutes([
    { path: '/', element: <Auth /> },
  ])

  return Routes
}
