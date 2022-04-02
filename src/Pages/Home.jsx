import { FlexCent } from "../Styles"
import { Profile } from './Components/Profile'
import { QrCode } from "./Components/QrCode"

export const Home = () => {
  return (
    <div className={`${FlexCent}`}>
      <Profile />
      <QrCode />
    </div>
  )
}
