import { useAccount } from "../context/hooks/useAccount"
import { FlexCent } from "../Styles"

/* Protected routes and fix sign out arrw fnctn */
export const ProtectedRoute = ({ children }) => {
  /* Custom Hook */
  const { loading } = useAccount()
  if (loading) return <div className={`${FlexCent} `} >Cargando...</div>
  return <>
    {children}
  </>
}
