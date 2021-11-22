import React, { useContext, useState, useEffect, useRef } from "react"
import { auth, db, app } from "../firebase"

/* Based on Web Dev Simplified Tutorial: https://youtu.be/PKwu15ldZ7k */

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}
// export function AuthPage(){
//   const provider = new app.auth.GoogleAuthProvider()
  
//   function authWithGoogle() {
//     return app.auth().signInWithPopup(provider)
//   }
// }  
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")

  function register(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}