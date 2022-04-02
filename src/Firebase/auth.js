import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth"
import { auth } from "./config"

/* Authentication & data persistance  */
/* Register a new user */
export const register = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    return user
  }
  /* Only log me the error */
  catch (err) { console.log(err) }
}
/* Login  */
export const signin = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return user
  }
  /* Only log me the error */
  catch (err) { console.log(err) }
}
/* Sign out current account */
export const logout = async () => {
  try {
    await signOut(auth)
  } catch (err) { console.log(err) }
}
/* Login with Google account */
export const loginWithGoogle = async () => {
  const googleProvider = new GoogleAuthProvider()
  return signInWithPopup(auth, googleProvider)
}
