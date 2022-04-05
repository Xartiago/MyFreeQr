import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc } from 'firebase/firestore'

export const db = getFirestore()
export const MenusRef = collection(db, 'menus')

/* Get documents */
export const userMenus = async (userUid) => {
  const q = query(MenusRef, where("user", "==", userUid))
  const data = await getDocs(q)
  let menus = []
  data.forEach((doc) => {
    menus.push(doc.data())
  })
  return menus
}
/* Create document */
export const createMenu = async (uid, num) => {
  try {
    const newMenu = await addDoc(MenusRef, {
      id: '',
      user: uid,
      num,
      url: '',
      files: [],
    })
    const menuId = newMenu.id
    const newUrl = menuId + num
    if (menuId) {
      await updateDoc(newMenu, { id: menuId, url: newUrl })
      return newMenu
    }
  } catch (err) {
    console.log(err)
  }
}
/* Get files in a specific Doc */
export const getFilesDoc = async (url) => {
  const q = query(MenusRef, where("url", "==", url))
  const data = await getDocs(q)
  let document = []
  data.forEach((doc) => {
    document.push(doc.data())
  })
  return document
}