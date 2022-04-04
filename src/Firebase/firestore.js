import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore'

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
      uid: uid + num,
      user: uid,
      num,
      url : '',
      files: [],
    })
    return newMenu
  } catch (err) {
    console.log(err)
  }
}