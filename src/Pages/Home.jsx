import { useAccount } from "../context/hooks/useAccount"
import { FlexCent } from "../Styles"
import { NavBar } from './Components/NavBar'
import { QrCode } from "./Components/QrCode"

export const Home = () => {
  const { loading } = useAccount()
  return loading ?
    <div className={`${FlexCent} h-screen text-xl`}>Cargando...</div>
    :
    <div className={`${FlexCent}`}>
      <NavBar />
      <QrCode />
    </div>
}
