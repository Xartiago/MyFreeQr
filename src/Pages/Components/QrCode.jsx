import { useEffect, useState } from "react"
/* Libraries */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "../../Firebase/storage"
import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
/* Another Components */
import { QR } from './QR'
/* Styles */
import { BigTtle, Buttons, FlexCent, FlexRowCent } from "../../Styles"
import { InputFile, SmallTxt } from "../../Styles/custom"
import { FileInptCont, LoadAndCustomCont, MenuCont, QrContainer, StXMenu } from "../../Styles/qrcodectm"
/* Custom hooks */
import { useAccount } from '../../context/hooks/useAccount'
import { createMenu, db, userMenus } from "../../Firebase/firestore"
/* Icons o Assets */
import Gris from '../../assets/gris.jpg'
import { BsTrash, BsFillFilePdfFill } from 'react-icons/bs'
import { Link } from "react-router-dom"

export const QrCode = () => {
  /* Custom Hook */
  const { account } = useAccount()
  /* Local States */
  const [menus, setMenus] = useState([])
  const [avlbMenus, setAvlbMenus] = useState(0)
  const [currentMenu, setCurrentMenu] = useState(1)
  const [crMenFiles, setCrMenFiles] = useState([])
  /* Update components when add a change */
  const [changes, setChanges] = useState(false)

  useEffect(() => {
    const getOrCreateMenu = async () => {
      const getMenus = await userMenus(account.uid)
      const sortMenus = getMenus.sort((pr, po) => pr.num - po.num)
      setCrMenFiles(sortMenus[currentMenu - 1].files)
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
          <DragDropContext onDragEnd={async (result) => {
            const { source, destination } = result
            if (!destination) return
            if (destination.index === source.index && source.droppableId === destination.droppableId) return
            /* Change menu */
            const sourceRef = crMenFiles[source.index]
            const destinationRef = crMenFiles[destination.index]
            const newMenu = crMenFiles
            newMenu[source.index] = destinationRef
            newMenu[destination.index] = sourceRef
            const docRef = doc(db, 'menus', menus[currentMenu - 1].id)
            await updateDoc(docRef, { files: newMenu })
          }}>
            <Droppable droppableId="files">
              {(droppableProvided) => <div className="w-10/12" {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>
                {menus.length > 0 && menus[currentMenu - 1].files.map((file, i) => {
                  /* Drag and Drop Files */
                  return <Draggable key={file} draggableId={file} index={i}>
                    {(draggableProvided) => <div className={`flex justify-between rounded px-4 py-3 border-2 bg-white border-indigo-200 w-full my-1`} {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                      <div>{
                        file.split('.')[5].substring(0, 3) === 'pdf' ?
                          <BsFillFilePdfFill className="text-red-800 " />
                          : <img src={file} className='w-6' />
                      }</div>
                      <span>Pagina {i + 1}</span>
                      <BsTrash className="cursor-pointer text-red-500 hover:text-red-900 hover:scale-x-110" onClick={() => onRemoveFiles(file)} />
                    </div>}
                  </Draggable>
                })}
                {droppableProvided.placeholder}
              </div>
              }
            </Droppable>
          </DragDropContext>
          {menus.length > 0 && menus[currentMenu - 1].files.length > 0 && <Link target='_blank' to={`/qr/${menus[currentMenu - 1].url}`} className={`${Buttons} flex justify-center`}>¡Visitar Menu!</Link>}
        </div>
        {/* QR editor Cont */}
        <div className={FlexCent}>
          <h3 className={`${BigTtle}`}>2. Customiza tu codigo QR</h3>
          <p className={SmallTxt}>¡Agrega un estilo unico a tu codigo qr: personaliza tu codigo como mas te guste!</p>
          <QR url={menus.length > 0 && `https://my-free-qr.vercel.app//qr/${menus.find(menu => menu.num === currentMenu).url}`} />
        </div>
      </div>
    </div>
  )
}
