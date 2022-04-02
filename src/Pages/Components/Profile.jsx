/* Assets */
import Mark from '../../assets/MarkN.svg'
import FreeQr from '../../assets/myfreeqrN.svg'
/* Styles */
import { FlexRowCent } from '../../Styles'
/* React icons */
import { ImExit } from 'react-icons/im'
/* Libraries */
import { logout } from '../../Firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const navigate = useNavigate()
  const SignOutAcc = async () => {
    await logout()
    return navigate('/')
  }
  return (
    <div className={`${FlexRowCent} bg-indigo-900 w-full md:left-0 py-2 justify-between px-4`}>
      <a href='https://myfreeqr.com/' target='_blank'><img src={FreeQr} className='w-10' /></a>
      <a href='https://xartiago.vercel.app/' target='_blank'><img src={Mark} className='w-6' /></a>
      <ImExit onClick={SignOutAcc} className='text-xl md:text-3xl text-white cursor-pointer' />
    </div>
  )
}
