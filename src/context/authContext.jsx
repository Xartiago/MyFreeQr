import { createContext } from "react";
import { useEffect, useState } from "react";
/* Firebase */
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from "../Firebase/config";

/* Create a global context */
export const context = createContext()

/* Create the context provider */
export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* Watcher login account and Status */
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setAccount(currentUser)
      setLoading(false)
    })

    return () => unSubscribe()
  }, [])

  return (
    <context.Provider value={{ account, setAccount, loading }}>
      {children}
    </context.Provider>
  )
}