import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore'

const db = getFirestore()
export const MenusRef = collection(db, 'menus')

/* Get documents */
export const userMenus = async (uid) => {
  const q = query(MenusRef, where("uid", "==", uid))
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
      uid,
      num,
    })
    return newMenu
  } catch (err) {
    console.log(err)
  }
}