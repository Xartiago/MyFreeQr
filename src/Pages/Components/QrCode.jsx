import { useEffect, useState } from "react"
/* Libraries */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../Firebase/storage"
/* Another Components */
import { QR } from './QR'
/* Styles */
import { BigTtle, Buttons, FlexCent, FlexRowCent } from "../../Styles"
import { InputFile, SmallTxt } from "../../Styles/custom"
import { FileInptCont, LoadAndCustomCont, MenuCont, QrContainer, StXMenu } from "../../Styles/qrcodectm"
/* Custom hooks */
import { useAccount } from '../../context/hooks/useAccount'
import { createMenu, db, userMenus } from "../../Firebase/firestore"
import Gris from '../../assets/gris.jpg'
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { BsTrash, BsFillFilePdfFill } from 'react-icons/bs'

export const QrCode = () => {
  /* Custom Hook */
  const { account } = useAccount()
  /* Local States */
  const [menus, setMenus] = useState([])
  const [avlbMenus, setAvlbMenus] = useState(0)
  const [currentMenu, setCurrentMenu] = useState(1)
  /* Update components when add a change */
  const [changes, setChanges] = useState(false)

  useEffect(() => {
    const getOrCreateMenu = async () => {
      const getMenus = await userMenus(account.uid)
      const sortMenus = getMenus.sort((pr, po) => pr.num - po.num)
      setMenus([...sortMenus])
      setAvlbMenus(getMenus.length)
    }
    getOrCreateMenu()
  }, [changes])

  /* Add new menu */
  const handlerAddMenu = async () => {
    try {
      if (avlbMenus < 5) {
        const newMenu = await createMenu(account.uid, avlbMenus + 1)
        if (newMenu) setChanges(!changes)
      }
    } catch (err) { console.log(err) }
  }
  /* Handler files changes */
  const uploadFiles = async (file) => {
    const { name } = file
    /* If file doesnt exist dont continue */
    if (!file) return;
    /* Submit the file */
    const storageRef = ref(storage, `/files/${name}`)
    const uploadTask = await uploadBytesResumable(storageRef, file)
    const getUrlReq = await getDownloadURL(ref(storage, `/files/${name}`))
    const findMenuId = menus.find(menu => menu.num === currentMenu).id
    const menuRef = doc(db, 'menus', findMenuId)
    await updateDoc(menuRef, {
      files: arrayUnion(getUrlReq)
    })
    setChanges(!changes)
  }
  const uploadFilesHandlerForm = async (event) => {
    event.preventDefault()
    const file = event.target[0].files[0]
    await uploadFiles(file)
  }
  const onRemoveFiles = async (file) => {
    const findMenuId = menus.find(menu => menu.num === currentMenu).id
    const menuRef = doc(db, 'menus', findMenuId)
    await updateDoc(menuRef, {
      files: arrayRemove(file)
    })
    setChanges(!changes)
  }

  return (
    <div className={QrContainer}>
      {/* Menus & Account*/}
      <div className={`${MenuCont} ${FlexCent}`}>
        <div className={`${FlexCent}`}>
          <img className={`rounded-full shadow-xl mb-2`} src={account ? (account.photoURL ? account.photoURL : Gris) : null} />
          <span className={`text-lg text-blue-900 font-bold`}>{account ? (account.displayName ? account.displayName : 'Cuenta activa') : null}</span>
          <span className={`text-sm mb-4`}>({account && account.email})</span>
          {menus.map((menu, i) => {
            const { num } = menu
            return <span key={i} className={`${StXMenu} ${currentMenu === num && 'rounded bg-gray-200'} cursor-pointer`} onClick={() => setCurrentMenu(num)}>Menu {num}</span>
          })}
          {avlbMenus < 5 && <button className={Buttons} onClick={handlerAddMenu}>Añadir menú</button>}
        </div>
      </div>
      {/* Load Files & QR editor */}
      <div className={LoadAndCustomCont}>
        {/* Load Files Cont */}
        <div className={`${FlexCent} pr-2 border-r`}>
          <h3 className={`${BigTtle} lg-`}>1. Modifica tu menú</h3>
          <p className={SmallTxt}>Carga imagenes o archivos (ya sea con formato .jpg, .pdf o .png) o eliminalos, puedes cargar cuantas imagenes quieras para hacer el menu que se adecue a tu negocio</p>
          {/* Upload files form  */}
          <form className={`${FlexCent} h-40`} onSubmit={e => uploadFilesHandlerForm(e)}>
            <div className={`${FlexCent} ${FileInptCont}`}>
              <input className={InputFile} type='file' />
            </div>
            <button className={`${Buttons}`} type='submit'>Agregar</button>
          </form>
          <h3 className={`${BigTtle} mt-3`}>Archivos del menu {currentMenu}</h3>
          {
            menus.length > 0 && menus[currentMenu - 1].files.map((file, i) => {
              return <div className={`flex justify-between rounded px-4 py-3 border-2 border-indigo-200 w-full my-1`} key={i}>

                <div>{
                  file.split('.')[5].substring(0, 3) === 'pdf' ?
                    <BsFillFilePdfFill className="text-red-800 "/>
                    : <img src={file} className='w-6' />
                }</div>
                <span>Pagina {i + 1}</span>
                <BsTrash className="cursor-pointer text-red-500 hover:text-red-900 hover:scale-x-110" onClick={() => onRemoveFiles(file)} />
              </div>
            })
          }
          { menus.length > 0 && menus[currentMenu - 1].files.length > 0 && <button className={Buttons}>Obtener Qr</button>}
        </div>
        {/* QR editor Cont */}
        <div className={FlexCent}>
          <h3 className={`${BigTtle}`}>2. Customiza tu codigo QR</h3>
          <p className={SmallTxt}>¡Agrega un estilo unico a tu codigo qr: personaliza tu codigo como mas te guste!</p>
          <QR url={menus.length > 0 && menus.find(menu => menu.num === currentMenu).url} />
        </div>
      </div>
    </div>
  )
}